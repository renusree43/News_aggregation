from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI(title="SDC API Gateway")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SPRING_URL = "http://localhost:8001"

@app.api_route("/api/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
async def proxy(path: str, request: Request):
    url = f"{SPRING_URL}/api/{path}"
    async with httpx.AsyncClient() as client:
        payload = await request.body()
        headers = {key: value for key, value in request.headers.items() if key.lower() != "host"}
        response = await client.request(
            request.method,
            url,
            headers=headers,
            content=payload,
            params=request.query_params,
            timeout=10.0,
        )

    return Response(content=response.content, status_code=response.status_code, headers=dict(response.headers))
