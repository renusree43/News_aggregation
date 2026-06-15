import httpx
from fastapi import APIRouter, HTTPException, Request, Response

from config.settings import get_settings


router = APIRouter(tags=["proxy"])


@router.api_route("/api/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"])
async def proxy_to_spring(path: str, request: Request) -> Response:
    settings = get_settings()
    url = f"{settings.spring_backend_url.rstrip('/')}/api/{path}"
    body = await request.body()
    headers = {
        key: value
        for key, value in request.headers.items()
        if key.lower() not in {"host", "content-length"}
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            upstream = await client.request(
                request.method,
                url,
                params=request.query_params,
                headers=headers,
                content=body,
            )
    except httpx.ConnectError as exc:
        raise HTTPException(
            status_code=503,
            detail=f"Spring Boot service is not running. Start it on {settings.spring_backend_url} first.",
        ) from exc
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail=f"Gateway proxy error: {exc}") from exc

    response_headers = {
        key: value
        for key, value in upstream.headers.items()
        if key.lower() not in {"content-encoding", "transfer-encoding", "connection", "content-length"}
    }
    return Response(
        content=upstream.content,
        status_code=upstream.status_code,
        headers=response_headers,
        media_type=upstream.headers.get("content-type"),
    )
