#!/usr/bin/env python3
"""
Migration script to add multilingual support (RU/EN) to platform_settings and community_settings
"""
import asyncio
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


async def migrate_platform_settings():
    """Migrate platform settings to multilingual format"""
    print("🔧 Migrating platform settings...")
    
    settings = await db.platform_settings.find_one({'id': 'platform_settings'})
    if not settings:
        print("⚠️  No platform_settings found, skipping...")
        return
    
    update = {}
    
    # Migrate section texts
    if 'section_badge' in settings and 'section_badge_ru' not in settings:
        update['section_badge_ru'] = settings.get('section_badge', 'ВНУТРИ ПЛАТФОРМЫ')
        update['section_badge_en'] = settings.get('section_badge', 'INSIDE THE PLATFORM')
    
    if 'section_title' in settings and 'section_title_ru' not in settings:
        update['section_title_ru'] = settings.get('section_title', 'Командный центр для вашего крипто-путешествия')
        update['section_title_en'] = settings.get('section_title', 'A command center for your crypto journey')
    
    if 'section_intro' in settings and 'section_intro_ru' not in settings:
        update['section_intro_ru'] = settings.get('section_intro', 'Следите за каждым движением рынка.')
        update['section_intro_en'] = settings.get('section_intro', 'See every market move.')
    
    # Migrate stats (community, visits, projects, alerts)
    for stat_key in ['community', 'visits', 'projects', 'alerts']:
        stat = settings.get(stat_key, {})
        if stat and 'label' in stat and 'label_ru' not in stat:
            stat['label_ru'] = stat.get('label', '')
            stat['label_en'] = stat.get('label', '')
            stat.pop('label', None)
            update[stat_key] = stat
    
    # Migrate service_modules
    modules = settings.get('service_modules', [])
    migrated_modules = []
    needs_migration = False
    for module in modules:
        if 'name' in module and 'name_ru' not in module:
            needs_migration = True
            module['name_ru'] = module.get('name', '')
            module['name_en'] = module.get('name', '')
            module['label_ru'] = module.get('label', '')
            module['label_en'] = module.get('label', '')
            module.pop('name', None)
            module.pop('label', None)
        migrated_modules.append(module)
    if needs_migration:
        update['service_modules'] = migrated_modules
    
    # Migrate services_list
    services = settings.get('services_list', [])
    migrated_services = []
    needs_migration = False
    for service in services:
        if 'title' in service and 'title_ru' not in service:
            needs_migration = True
            service['title_ru'] = service.get('title', '')
            service['title_en'] = service.get('title', '')
            service['description_ru'] = service.get('description', '')
            service['description_en'] = service.get('description', '')
            service.pop('title', None)
            service.pop('description', None)
        migrated_services.append(service)
    if needs_migration:
        update['services_list'] = migrated_services
    
    # Migrate bottom_stats
    bottom_stats = settings.get('bottom_stats', [])
    migrated_bottom = []
    needs_migration = False
    for stat in bottom_stats:
        if 'label' in stat and 'label_ru' not in stat:
            needs_migration = True
            stat['label_ru'] = stat.get('label', '')
            stat['label_en'] = stat.get('label', '')
            stat['description_ru'] = stat.get('description', '')
            stat['description_en'] = stat.get('description', '')
            stat.pop('label', None)
            stat.pop('description', None)
        migrated_bottom.append(stat)
    if needs_migration:
        update['bottom_stats'] = migrated_bottom
    
    # Apply updates
    if update:
        unset = {}
        if 'section_badge_ru' in update:
            unset['section_badge'] = ''
        if 'section_title_ru' in update:
            unset['section_title'] = ''
        if 'section_intro_ru' in update:
            unset['section_intro'] = ''
        
        await db.platform_settings.update_one(
            {'id': 'platform_settings'},
            {'$set': update, '$unset': unset} if unset else {'$set': update}
        )
        print(f"✅ Migrated platform settings with {len(update)} fields")
    else:
        print("✅ Platform settings already migrated")


async def migrate_community_settings():
    """Migrate community settings to multilingual format"""
    print("🌐 Migrating community settings...")
    
    settings = await db.community_settings.find_one({'id': 'community_settings'})
    if not settings:
        print("⚠️  No community_settings found, skipping...")
        return
    
    update = {}
    unset = {}
    
    # Migrate title
    if 'title' in settings and 'title_ru' not in settings:
        update['title_ru'] = settings.get('title', 'Присоединяйся к сообществу')
        update['title_en'] = settings.get('title', 'Join the Community')
        unset['title'] = ''
    
    # Migrate description
    if 'description' in settings and 'description_ru' not in settings:
        update['description_ru'] = settings.get('description', 'Общайтесь с web3 основателями.')
        update['description_en'] = settings.get('description', 'Connect with web3 founders.')
        unset['description'] = ''
    
    # Migrate subscribe_title
    if 'subscribe_title' in settings and 'subscribe_title_ru' not in settings:
        update['subscribe_title_ru'] = settings.get('subscribe_title', 'Будь в курсе')
        update['subscribe_title_en'] = settings.get('subscribe_title', 'Stay Updated')
        unset['subscribe_title'] = ''
    
    # Apply updates
    if update:
        await db.community_settings.update_one(
            {'id': 'community_settings'},
            {'$set': update, '$unset': unset} if unset else {'$set': update}
        )
        print(f"✅ Migrated community settings with {len(update)} fields")
    else:
        print("✅ Community settings already migrated")


async def main():
    """Run all migrations"""
    print("🌍 Starting settings multilingual migration...")
    print("=" * 60)
    
    await migrate_platform_settings()
    await migrate_community_settings()
    
    print("=" * 60)
    print("✅ Settings migration completed!")


if __name__ == "__main__":
    asyncio.run(main())
