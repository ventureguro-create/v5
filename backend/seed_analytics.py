#!/usr/bin/env python3
"""
Seed script to generate realistic analytics test data
"""
import asyncio
import random
from datetime import datetime, timedelta, timezone
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Sample data
COUNTRIES = [
    ("Sweden", "Stockholm", 29),
    ("Germany", "Frankfurt am Main", 21),
    ("United States", "San Jose", 6),
    ("United States", "Ashburn", 5),
    ("Ireland", "Dublin", 3),
    ("Japan", "Tokyo", 1)
]

PAGES = [
    "/", "/about", "/roadmap", "/team", "/projects", "/partners", "/faq"
]

BUTTONS = [
    ("login-btn", "Login"),
    ("signup-btn", "Sign Up"),
    ("launch-btn", "Launch Platform"),
    ("learn-more-btn", "Learn More"),
    ("contact-btn", "Contact Us")
]

REFERRERS = [
    ("https://vercel.com/dashboard", "referral", "vercel.com"),
    ("https://spyhost.site/listing", "referral", "spyhost.site"),
    ("https://www.google.com/search?q=fomo+crypto", "search", "Google"),
    ("", "direct", "Direct"),
    ("", "direct", "Direct"),
    ("", "direct", "Direct"),  # More direct traffic
]

USER_AGENTS = [
    # Desktop - Chrome
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    # Desktop - Firefox
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
    # Mobile
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
]


async def generate_session(session_id, country, city, is_new=True, days_ago=0):
    """Generate a realistic user session with multiple events"""
    events = []
    
    # Random referrer and traffic source
    referrer_data = random.choice(REFERRERS)
    referrer, traffic_source, source_detail = referrer_data
    
    # Random user agent
    user_agent = random.choice(USER_AGENTS)
    
    # Parse device type from user agent
    if "Mobile" in user_agent or "iPhone" in user_agent or "Android" in user_agent:
        device_type = "mobile"
    elif "Tablet" in user_agent or "iPad" in user_agent:
        device_type = "tablet"
    else:
        device_type = "desktop"
    
    # Base timestamp
    base_time = datetime.now(timezone.utc) - timedelta(days=days_ago, hours=random.randint(0, 23), minutes=random.randint(0, 59))
    
    # Session duration (20 seconds to 5 minutes)
    session_duration = random.randint(20, 300)
    
    # Generate 1-5 page views per session
    num_pageviews = random.randint(1, 5)
    
    for i in range(num_pageviews):
        page = random.choice(PAGES)
        timestamp = base_time + timedelta(seconds=i*10)
        
        event = {
            "id": f"{session_id}-pv-{i}",
            "session_id": session_id,
            "event_type": "pageview",
            "page_url": page,
            "page_title": f"FOMO - {page.replace('/', '').title() or 'Home'}",
            "user_agent": user_agent,
            "device_type": device_type,
            "browser": "Chrome" if "Chrome" in user_agent else ("Firefox" if "Firefox" in user_agent else "Safari"),
            "os": "Windows" if "Windows" in user_agent else ("Mac" if "Mac" in user_agent else ("iOS" if "iPhone" in user_agent else "Android")),
            "country": country,
            "city": city,
            "ip_address": f"{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}",
            "referrer": referrer,
            "traffic_source": traffic_source,
            "source_detail": source_detail,
            "timestamp": timestamp.isoformat(),
            "session_duration": session_duration if i == num_pageviews - 1 else None,
            "is_new_visitor": is_new and i == 0,
            "is_returning": not is_new and i == 0
        }
        events.append(event)
    
    # Maybe add some button clicks (30% chance per session)
    if random.random() < 0.3:
        num_clicks = random.randint(1, 3)
        for i in range(num_clicks):
            button_id, button_text = random.choice(BUTTONS)
            timestamp = base_time + timedelta(seconds=random.randint(5, session_duration - 5))
            
            event = {
                "id": f"{session_id}-click-{i}",
                "session_id": session_id,
                "event_type": "click",
                "button_id": button_id,
                "button_text": button_text,
                "page_url": random.choice(PAGES),
                "user_agent": user_agent,
                "device_type": device_type,
                "browser": "Chrome" if "Chrome" in user_agent else ("Firefox" if "Firefox" in user_agent else "Safari"),
                "os": "Windows" if "Windows" in user_agent else ("Mac" if "Mac" in user_agent else ("iOS" if "iPhone" in user_agent else "Android")),
                "country": country,
                "city": city,
                "ip_address": f"{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}",
                "referrer": referrer,
                "traffic_source": traffic_source,
                "source_detail": source_detail,
                "timestamp": timestamp.isoformat(),
                "is_new_visitor": False,
                "is_returning": not is_new
            }
            events.append(event)
    
    # Maybe add conversion (5% chance - registration)
    if random.random() < 0.05:
        timestamp = base_time + timedelta(seconds=random.randint(30, session_duration))
        
        event = {
            "id": f"{session_id}-conversion",
            "session_id": session_id,
            "event_type": "conversion",
            "conversion_type": "registration",
            "page_url": "/signup",
            "user_agent": user_agent,
            "device_type": device_type,
            "browser": "Chrome" if "Chrome" in user_agent else ("Firefox" if "Firefox" in user_agent else "Safari"),
            "os": "Windows" if "Windows" in user_agent else ("Mac" if "Mac" in user_agent else ("iOS" if "iPhone" in user_agent else "Android")),
            "country": country,
            "city": city,
            "ip_address": f"{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}",
            "referrer": referrer,
            "traffic_source": traffic_source,
            "source_detail": source_detail,
            "timestamp": timestamp.isoformat(),
            "is_new_visitor": False,
            "is_returning": not is_new
        }
        events.append(event)
    
    return events


async def seed_data():
    """Generate realistic analytics data"""
    print("🌱 Seeding analytics data...")
    
    # Clear existing data
    await db.analytics_events.delete_many({})
    print("✅ Cleared existing analytics data")
    
    all_events = []
    session_counter = 0
    
    # Generate sessions for the last 30 days
    for days_ago in range(30):
        # More traffic in recent days
        sessions_per_day = random.randint(1, 4) if days_ago > 15 else random.randint(2, 8)
        
        for _ in range(sessions_per_day):
            # Pick random country/city weighted by visitor count
            country_data = random.choices(
                COUNTRIES,
                weights=[count for _, _, count in COUNTRIES],
                k=1
            )[0]
            country, city, _ = country_data
            
            # 90% new visitors, 10% returning
            is_new = random.random() < 0.9
            
            session_id = f"session_{session_counter}"
            session_counter += 1
            
            events = await generate_session(session_id, country, city, is_new, days_ago)
            all_events.extend(events)
    
    # Insert all events
    if all_events:
        await db.analytics_events.insert_many(all_events)
        print(f"✅ Inserted {len(all_events)} analytics events")
        print(f"📊 Generated {session_counter} unique sessions")
        print(f"📍 Data spans last 30 days")
    
    print("🎉 Seeding complete!")


if __name__ == "__main__":
    asyncio.run(seed_data())
