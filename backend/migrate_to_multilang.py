#!/usr/bin/env python3
"""
Migration script to add multilingual support (RU/EN) to existing data
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


async def migrate_drawer_cards():
    """Migrate drawer cards to multilingual format"""
    print("📦 Migrating drawer cards...")
    cards = await db.drawer_cards.find({}).to_list(1000)
    
    for card in cards:
        if 'title' in card and 'title_ru' not in card:
            update = {
                'title_ru': card.get('title', ''),
                'title_en': card.get('title', '')
            }
            await db.drawer_cards.update_one(
                {'id': card['id']},
                {'$set': update, '$unset': {'title': ''}}
            )
    print(f"✅ Migrated {len(cards)} drawer cards")


async def migrate_team_members():
    """Migrate team members to multilingual format"""
    print("👥 Migrating team members...")
    members = await db.team_members.find({}).to_list(1000)
    
    for member in members:
        if 'name' in member and 'name_ru' not in member:
            update = {
                'name_ru': member.get('name', ''),
                'name_en': member.get('name', ''),
                'position_ru': member.get('position', ''),
                'position_en': member.get('position', ''),
                'bio_ru': member.get('bio', ''),
                'bio_en': member.get('bio', '')
            }
            await db.team_members.update_one(
                {'id': member['id']},
                {'$set': update, '$unset': {'name': '', 'position': '', 'bio': ''}}
            )
    print(f"✅ Migrated {len(members)} team members")


async def migrate_partners():
    """Migrate partners to multilingual format"""
    print("🤝 Migrating partners...")
    partners = await db.partners.find({}).to_list(1000)
    
    for partner in partners:
        if 'name' in partner and 'name_ru' not in partner:
            update = {
                'name_ru': partner.get('name', ''),
                'name_en': partner.get('name', ''),
                'description_ru': partner.get('description', ''),
                'description_en': partner.get('description', '')
            }
            await db.partners.update_one(
                {'id': partner['id']},
                {'$set': update, '$unset': {'name': '', 'description': ''}}
            )
    print(f"✅ Migrated {len(partners)} partners")


async def migrate_faq():
    """Migrate FAQ items to multilingual format"""
    print("❓ Migrating FAQ...")
    faq_items = await db.faq_items.find({}).to_list(1000)
    
    for item in faq_items:
        if 'question' in item and 'question_ru' not in item:
            update = {
                'question_ru': item.get('question', ''),
                'question_en': item.get('question', ''),
                'answer_ru': item.get('answer', ''),
                'answer_en': item.get('answer', '')
            }
            await db.faq_items.update_one(
                {'id': item['id']},
                {'$set': update, '$unset': {'question': '', 'answer': ''}}
            )
    print(f"✅ Migrated {len(faq_items)} FAQ items")


async def migrate_roadmap():
    """Migrate roadmap tasks to multilingual format"""
    print("🗺️ Migrating roadmap...")
    settings = await db.roadmap_settings.find_one({'id': 'roadmap_settings'})
    
    if settings and 'tasks' in settings:
        tasks = settings['tasks']
        for task in tasks:
            if 'name' in task and 'name_ru' not in task:
                task['name_ru'] = task.get('name', '')
                task['name_en'] = task.get('name', '')
                task.pop('name', None)
        
        # Update titles
        update = {'tasks': tasks}
        if 'section_badge' in settings:
            update['section_badge_ru'] = settings.get('section_badge', '')
            update['section_badge_en'] = settings.get('section_badge', '')
        if 'section_title' in settings:
            update['section_title_ru'] = settings.get('section_title', '')
            update['section_title_en'] = settings.get('section_title', '')
        if 'section_subtitle' in settings:
            update['section_subtitle_ru'] = settings.get('section_subtitle', '')
            update['section_subtitle_en'] = settings.get('section_subtitle', '')
        
        await db.roadmap_settings.update_one(
            {'id': 'roadmap_settings'},
            {'$set': update, '$unset': {'section_badge': '', 'section_title': '', 'section_subtitle': ''}}
        )
        print(f"✅ Migrated roadmap with {len(tasks)} tasks")


async def migrate_evolution_levels():
    """Migrate evolution levels to multilingual format"""
    print("🚀 Migrating evolution levels...")
    levels = await db.evolution_levels.find({}).to_list(1000)
    
    for level in levels:
        if 'rank' in level and 'rank_ru' not in level:
            update = {
                'rank_ru': level.get('rank', ''),
                'rank_en': level.get('rank', ''),
                'next_level_ru': level.get('next_level', ''),
                'next_level_en': level.get('next_level', ''),
                'description_ru': level.get('description', ''),
                'description_en': level.get('description', '')
            }
            await db.evolution_levels.update_one(
                {'id': level['id']},
                {'$set': update, '$unset': {'rank': '', 'next_level': '', 'description': ''}}
            )
    print(f"✅ Migrated {len(levels)} evolution levels")


async def migrate_evolution_badges():
    """Migrate evolution badges to multilingual format"""
    print("🏆 Migrating evolution badges...")
    badges = await db.evolution_badges.find({}).to_list(1000)
    
    for badge in badges:
        if 'name' in badge and 'name_ru' not in badge:
            update = {
                'name_ru': badge.get('name', ''),
                'name_en': badge.get('name', ''),
                'condition_ru': badge.get('condition', ''),
                'condition_en': badge.get('condition', ''),
                'description_ru': badge.get('description', ''),
                'description_en': badge.get('description', '')
            }
            await db.evolution_badges.update_one(
                {'id': badge['id']},
                {'$set': update, '$unset': {'name': '', 'condition': '', 'description': ''}}
            )
    print(f"✅ Migrated {len(badges)} evolution badges")


async def main():
    """Run all migrations"""
    print("🌍 Starting multilingual migration...")
    print("=" * 60)
    
    await migrate_drawer_cards()
    await migrate_team_members()
    await migrate_partners()
    await migrate_faq()
    await migrate_roadmap()
    await migrate_evolution_levels()
    await migrate_evolution_badges()
    
    print("=" * 60)
    print("✅ Migration completed!")
    print("\nℹ️  Note: Platform settings, footer, and community settings")
    print("   need manual migration due to complex nested structures.")


if __name__ == "__main__":
    asyncio.run(main())
