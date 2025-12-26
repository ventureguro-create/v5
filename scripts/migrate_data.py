#!/usr/bin/env python3
"""
Data Migration Script
Loads all default data into MongoDB
"""

import asyncio
import sys
import os
from datetime import datetime, timezone
from uuid import uuid4

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from motor.motor_asyncio import AsyncIOMotorClient

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'test_database')
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

print(f"📊 Using database: {DB_NAME}\n")

async def migrate_roadmap_tasks():
    """Migrate roadmap tasks"""
    print("📋 Migrating roadmap tasks...")
    
    # Check if tasks already exist
    existing = await db.roadmap_tasks.count_documents({})
    if existing > 0:
        print(f"  ⚠️  Found {existing} existing tasks, updating them...")
        # Delete old tasks
        await db.roadmap_tasks.delete_many({})
    
    default_tasks = [
        {"id": str(uuid4()), "name_ru": "Архитектура платформы", "name_en": "Platform Architecture", "status": "done", "category": "Development", "order": 1},
        {"id": str(uuid4()), "name_ru": "Формирование команды", "name_en": "Core Team Formation", "status": "done", "category": "Team", "order": 2},
        {"id": str(uuid4()), "name_ru": "Запуск Alpha версии", "name_en": "Alpha Version Launch", "status": "done", "category": "Development", "order": 3},
        {"id": str(uuid4()), "name_ru": "Создание сообщества", "name_en": "Community Building", "status": "done", "category": "Marketing", "order": 4},
        {"id": str(uuid4()), "name_ru": "Beta версия v1.0", "name_en": "Beta Version v1.0", "status": "done", "category": "Development", "order": 5},
        {"id": str(uuid4()), "name_ru": "Минт NFT Box 666", "name_en": "NFT Box 666 Mint", "status": "done", "category": "NFT", "order": 6},
        {"id": str(uuid4()), "name_ru": "Интеграция кошелька", "name_en": "Wallet Integration", "status": "done", "category": "Development", "order": 7},
        {"id": str(uuid4()), "name_ru": "Панель аналитики", "name_en": "Analytics Dashboard", "status": "done", "category": "Development", "order": 8},
        {"id": str(uuid4()), "name_ru": "Beta версия v1.1", "name_en": "Beta Version v1.1", "status": "progress", "category": "Development", "order": 9},
        {"id": str(uuid4()), "name_ru": "OTC Маркетплейс", "name_en": "OTC Marketplace", "status": "progress", "category": "Development", "order": 10},
        {"id": str(uuid4()), "name_ru": "Разработка мобильного приложения", "name_en": "Mobile App Development", "status": "progress", "category": "Development", "order": 11},
        {"id": str(uuid4()), "name_ru": "Партнерские программы", "name_en": "Partnership Programs", "status": "progress", "category": "Business", "order": 12},
    ]
    
    for task in default_tasks:
        task["created_at"] = datetime.now(timezone.utc).isoformat()
        task["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    await db.roadmap_tasks.insert_many(default_tasks)
    print(f"  ✅ Migrated {len(default_tasks)} roadmap tasks")

async def migrate_team_members():
    """Migrate team members"""
    print("👥 Migrating team members...")
    
    # Check if members already exist
    existing = await db.team_members.count_documents({})
    if existing > 0:
        print(f"  ⚠️  Found {existing} existing team members, updating them...")
        await db.team_members.delete_many({})
    
    default_members = [
        {
            "id": str(uuid4()),
            "name_ru": "Алекс Морган",
            "name_en": "Alex Morgan",
            "position_ru": "CEO и Основатель",
            "position_en": "CEO & Founder",
            "bio_ru": "10+ лет опыта в блокчейне и крипто-трейдинге",
            "bio_en": "10+ years in blockchain and crypto trading",
            "image_url": "",
            "social_links": {
                "twitter": "https://twitter.com/alexmorgan",
                "linkedin": "https://linkedin.com/in/alexmorgan"
            },
            "displayed_socials": ["twitter", "linkedin"],
            "member_type": "main",
            "order": 1,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid4()),
            "name_ru": "Сара Чен",
            "name_en": "Sarah Chen",
            "position_ru": "Технический директор",
            "position_en": "CTO",
            "bio_ru": "Бывший инженер Google, эксперт по блокчейну",
            "bio_en": "Former Google engineer, blockchain expert",
            "image_url": "",
            "social_links": {
                "twitter": "https://twitter.com/sarahchen",
                "linkedin": "https://linkedin.com/in/sarahchen"
            },
            "displayed_socials": ["twitter", "linkedin"],
            "member_type": "main",
            "order": 2,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid4()),
            "name_ru": "Майкл Росс",
            "name_en": "Michael Ross",
            "position_ru": "Руководитель продукта",
            "position_en": "Head of Product",
            "bio_ru": "Экс-Binance, специалист по продуктовой стратегии",
            "bio_en": "Ex-Binance, product strategy specialist",
            "image_url": "",
            "social_links": {
                "twitter": "https://twitter.com/michaelross",
                "linkedin": "https://linkedin.com/in/michaelross"
            },
            "displayed_socials": ["twitter", "linkedin"],
            "member_type": "main",
            "order": 3,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        # Additional team members (not core)
        {
            "id": str(uuid4()),
            "name_ru": "Эмили Джонс",
            "name_en": "Emily Jones",
            "position_ru": "Senior Developer",
            "position_en": "Senior Developer",
            "bio_ru": "Full-stack разработчик с опытом в blockchain",
            "bio_en": "Full-stack developer with blockchain experience",
            "image_url": "",
            "social_links": {},
            "displayed_socials": [],
            "member_type": "team_member",
            "order": 4,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid4()),
            "name_ru": "Дэвид Ли",
            "name_en": "David Lee",
            "position_ru": "Marketing Manager",
            "position_en": "Marketing Manager",
            "bio_ru": "Специалист по крипто-маркетингу",
            "bio_en": "Crypto marketing specialist",
            "image_url": "",
            "social_links": {},
            "displayed_socials": [],
            "member_type": "team_member",
            "order": 5,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid4()),
            "name_ru": "Анна Смит",
            "name_en": "Anna Smith",
            "position_ru": "Community Manager",
            "position_en": "Community Manager",
            "bio_ru": "Управление сообществом и поддержка",
            "bio_en": "Community management and support",
            "image_url": "",
            "social_links": {},
            "displayed_socials": [],
            "member_type": "team_member",
            "order": 6,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    await db.team_members.insert_many(default_members)
    print(f"  ✅ Migrated {len(default_members)} team members")

async def check_platform_settings():
    """Check if platform settings exist"""
    print("⚙️  Checking platform settings...")
    
    settings = await db.platform_settings.find_one({"id": "platform_settings"})
    if settings:
        modules_count = len(settings.get('service_modules', []))
        print(f"  ℹ️  Platform settings exist with {modules_count} modules")
    else:
        print("  ⚠️  Platform settings not found")

async def main():
    """Run all migrations"""
    print("\n🚀 Starting data migration...\n")
    
    try:
        await migrate_roadmap_tasks()
        await migrate_team_members()
        await check_platform_settings()
        
        print("\n✅ Migration completed successfully!\n")
    except Exception as e:
        print(f"\n❌ Migration failed: {e}\n")
        raise
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(main())
