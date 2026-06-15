const NEWS_KEY = 'sdc_news_items'
const NEWS_VERSION_KEY = 'sdc_news_version'
const NEWS_VERSION = '3'

export const categories = [
  'Sports',
  'Cinema',
  'Thriller',
  'Crime',
  'Politics',
  'Celebrity',
  'Cooking',
  'Technology'
]

const categoryNews = {
  Sports: [
    ['India wins a last-over cricket thriller', 'A tense chase ended with a clean boundary in the final over, giving fans one of the most exciting finishes of the season.'],
    ['Young sprinter breaks state record', 'A 19-year-old athlete clocked a personal best and reset the state record at the inter-college athletics meet.'],
    ['Football league final sells out in hours', 'Supporters rushed for tickets after both finalists confirmed full-strength squads for the weekend match.']
  ],
  Cinema: [
    ['New cinema release opens to packed weekend shows', 'The latest theatrical release is drawing strong audience response across cities after positive early reviews.'],
    ['Director announces musical drama for festival season', 'The upcoming film will blend family emotion, original songs, and a story set across two decades.'],
    ['Regional film wins major critics award', 'A small-budget drama earned praise for its writing, performances, and realistic visual style.']
  ],
  Thriller: [
    ['Streaming platform announces a suspense thriller slate', 'Three new thriller series will focus on investigations, psychological tension, and courtroom drama.'],
    ['Mystery novel adaptation begins production', 'The series follows a journalist who reopens a cold case after finding a missing diary.'],
    ['Crime thriller trailer trends online', 'Viewers praised the trailer for its sharp editing, eerie score, and unexpected final reveal.']
  ],
  Crime: [
    ['City police crack major cyber crime network', 'Investigators traced fraudulent calls and payment links to a coordinated operation spread across multiple districts.'],
    ['Jewellery store robbery suspects arrested', 'Police recovered stolen valuables after tracking CCTV footage and vehicle movement across the city.'],
    ['Public advisory issued on payment scams', 'Officials warned citizens to avoid unknown links and verify customer-care numbers before sharing details.']
  ],
  Politics: [
    ['Parliament debates new urban transport policy', 'Lawmakers discussed funding models for cleaner buses, metro extensions, and safer pedestrian access.'],
    ['State cabinet clears rural health proposal', 'The proposal aims to upgrade primary health centers with telemedicine rooms and additional nursing staff.'],
    ['Election commission publishes revised voter list', 'Citizens can verify their details online and request corrections before the upcoming local elections.']
  ],
  Celebrity: [
    ['Actor announces charity education fund', 'The fund will support scholarships, school supplies, and digital learning access for students in rural areas.'],
    ['Singer confirms India tour dates', 'The tour will cover major cities with a new stage design and a setlist built around fan favorites.'],
    ['Celebrity chef launches community kitchen drive', 'The campaign will serve fresh meals through local partners and highlight low-cost nutrition.']
  ],
  Cooking: [
    ['Chef shares quick millet breakfast recipes', 'Simple millet bowls, dosas, and vegetable upma are becoming popular as healthy weekday breakfast choices.'],
    ['Home cooks bring back traditional pickle methods', 'Seasonal mango and lemon pickles are being prepared with sun-drying, careful spice blends, and family recipes.'],
    ['Five easy dinner ideas for busy students', 'Nutritionists recommend simple rice bowls, lentil soups, egg rolls, and vegetable stir-fries for affordable meals.']
  ],
  Technology: [
    ['AI tools help students personalize learning', 'Adaptive study apps are helping learners revise difficult topics through quizzes, summaries, and practice plans.'],
    ['Cybersecurity basics every student should know', 'Experts recommend strong passwords, two-factor authentication, and caution with public Wi-Fi networks.'],
    ['Startups focus on green technology', 'New ventures are building low-cost sensors, battery tools, and energy dashboards for cleaner campuses.']
  ]
}

const imagesByCategory = {
  Sports: [
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=640&q=80',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=640&q=80',
    'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=640&q=80'
  ],
  Cinema: [
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=640&q=80',
    'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=640&q=80',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=640&q=80'
  ],
  Thriller: [
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&q=80',
    'https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&fit=crop&w=640&q=80',
    'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=640&q=80'
  ],
  Crime: [
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=640&q=80',
    'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=640&q=80',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=640&q=80'
  ],
  Politics: [
    'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=640&q=80',
    'https://images.unsplash.com/photo-1541872705-1f73c6400ec9?auto=format&fit=crop&w=640&q=80',
    'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=640&q=80'
  ],
  Celebrity: [
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=640&q=80',
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=640&q=80',
    'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=640&q=80'
  ],
  Cooking: [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=640&q=80',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=640&q=80',
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=640&q=80'
  ],
  Technology: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=640&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=640&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=640&q=80'
  ]
}

const sourceByCategory = {
  Sports: 'Sports Desk',
  Cinema: 'Entertainment Wire',
  Thriller: 'Screen Beat',
  Crime: 'City Bureau',
  Politics: 'National Newsroom',
  Celebrity: 'Star Journal',
  Cooking: 'Food Journal',
  Technology: 'Tech Daily'
}

export const seedNews = categories.flatMap((category, categoryIndex) =>
  categoryNews[category].map(([title, summary], itemIndex) => {
    const hour = 9 + categoryIndex
    const displayHour = hour <= 12 ? hour : hour - 12
    const suffix = hour < 12 ? 'AM' : 'PM'
    const minute = String(10 + itemIndex * 12).padStart(2, '0')
    return {
      id: categoryIndex * 10 + itemIndex + 1,
      title,
      category,
      source: sourceByCategory[category],
      time: `Today, ${displayHour}:${minute} ${suffix}`,
      image: imagesByCategory[category][itemIndex],
      summary,
      content: `${summary} The full report adds context, background, and what readers should watch next. Updates from trusted sources will be added as the story develops through the day.`,
      published: true
    }
  })
)

function installSeedNews(){
  localStorage.setItem(NEWS_KEY, JSON.stringify(seedNews))
  localStorage.setItem(NEWS_VERSION_KEY, NEWS_VERSION)
  return seedNews
}

export function getNewsItems(){
  const version = localStorage.getItem(NEWS_VERSION_KEY)
  const raw = localStorage.getItem(NEWS_KEY)
  if(version !== NEWS_VERSION || !raw) return installSeedNews()

  try{
    return JSON.parse(raw)
  }catch{
    return installSeedNews()
  }
}

export function saveNewsItems(items){
  localStorage.setItem(NEWS_KEY, JSON.stringify(items))
  localStorage.setItem(NEWS_VERSION_KEY, NEWS_VERSION)
}
