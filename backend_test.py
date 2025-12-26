#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime
from typing import Dict, List, Any

class FOMOBackendTester:
    def __init__(self, base_url="https://fomo-english-ui.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.admin_token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name: str, success: bool, details: str = ""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test_name": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        })

    def test_basic_connectivity(self):
        """Test basic API connectivity"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_test("Basic API Connectivity", True)
                    return True
                else:
                    self.log_test("Basic API Connectivity", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("Basic API Connectivity", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Basic API Connectivity", False, f"Connection error: {str(e)}")
            return False

    def test_admin_login(self):
        """Test admin authentication"""
        try:
            login_data = {"password": "admin123"}
            response = requests.post(f"{self.api_url}/admin/login", json=login_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("token"):
                    self.admin_token = data["token"]
                    self.log_test("Admin Login", True)
                    return True
                else:
                    self.log_test("Admin Login", False, f"Invalid response structure: {data}")
                    return False
            else:
                self.log_test("Admin Login", False, f"Status code: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("Admin Login", False, f"Error: {str(e)}")
            return False

    def test_admin_login_wrong_password(self):
        """Test admin authentication with wrong password"""
        try:
            login_data = {"password": "wrongpassword"}
            response = requests.post(f"{self.api_url}/admin/login", json=login_data, timeout=10)
            
            if response.status_code == 401:
                self.log_test("Admin Login (Wrong Password)", True)
                return True
            else:
                self.log_test("Admin Login (Wrong Password)", False, f"Expected 401, got {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Admin Login (Wrong Password)", False, f"Error: {str(e)}")
            return False

    def test_drawer_cards_crud(self):
        """Test drawer cards CRUD operations"""
        # Test GET empty list
        try:
            response = requests.get(f"{self.api_url}/drawer-cards", timeout=10)
            if response.status_code == 200:
                cards = response.json()
                self.log_test("Get Drawer Cards (Empty)", True, f"Found {len(cards)} cards")
            else:
                self.log_test("Get Drawer Cards (Empty)", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Get Drawer Cards (Empty)", False, f"Error: {str(e)}")
            return False

        # Test CREATE card
        test_card = {
            "title_ru": "Test Project",
            "title_en": "Test Project",
            "link": "https://example.com",
            "image_url": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=800",
            "order": 0
        }
        
        try:
            response = requests.post(f"{self.api_url}/drawer-cards", json=test_card, timeout=10)
            if response.status_code == 200:
                created_card = response.json()
                card_id = created_card.get("id")
                if card_id:
                    self.log_test("Create Drawer Card", True, f"Created card with ID: {card_id}")
                    
                    # Test GET specific card
                    response = requests.get(f"{self.api_url}/drawer-cards/{card_id}", timeout=10)
                    if response.status_code == 200:
                        self.log_test("Get Specific Drawer Card", True)
                    else:
                        self.log_test("Get Specific Drawer Card", False, f"Status code: {response.status_code}")
                    
                    # Test UPDATE card
                    update_data = {"title_en": "Updated Test Project", "title_ru": "Updated Test Project"}
                    response = requests.put(f"{self.api_url}/drawer-cards/{card_id}", json=update_data, timeout=10)
                    if response.status_code == 200:
                        updated_card = response.json()
                        if updated_card.get("title_en") == "Updated Test Project":
                            self.log_test("Update Drawer Card", True)
                        else:
                            self.log_test("Update Drawer Card", False, "Title not updated")
                    else:
                        self.log_test("Update Drawer Card", False, f"Status code: {response.status_code}")
                    
                    # Test DELETE card
                    response = requests.delete(f"{self.api_url}/drawer-cards/{card_id}", timeout=10)
                    if response.status_code == 200:
                        self.log_test("Delete Drawer Card", True)
                    else:
                        self.log_test("Delete Drawer Card", False, f"Status code: {response.status_code}")
                    
                    return True
                else:
                    self.log_test("Create Drawer Card", False, "No ID in response")
                    return False
            else:
                self.log_test("Create Drawer Card", False, f"Status code: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("Create Drawer Card", False, f"Error: {str(e)}")
            return False

    def test_team_members_crud(self):
        """Test team members CRUD operations"""
        # Test GET empty list
        try:
            response = requests.get(f"{self.api_url}/team-members", timeout=10)
            if response.status_code == 200:
                members = response.json()
                self.log_test("Get Team Members (Empty)", True, f"Found {len(members)} members")
            else:
                self.log_test("Get Team Members (Empty)", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Get Team Members (Empty)", False, f"Error: {str(e)}")
            return False

        # Test CREATE team member
        test_member = {
            "name_en": "Test Member",
            "name_ru": "Test Member",
            "position_en": "Test Position",
            "position_ru": "Test Position",
            "bio_en": "Test bio for team member",
            "bio_ru": "Test bio for team member",
            "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400",
            "social_links": {
                "twitter": "https://twitter.com/test",
                "linkedin": "https://linkedin.com/in/test"
            },
            "displayed_socials": ["twitter", "linkedin"],
            "member_type": "main",
            "order": 0
        }
        
        try:
            response = requests.post(f"{self.api_url}/team-members", json=test_member, timeout=10)
            if response.status_code == 200:
                created_member = response.json()
                member_id = created_member.get("id")
                if member_id:
                    self.log_test("Create Team Member", True, f"Created member with ID: {member_id}")
                    
                    # Test GET specific member
                    response = requests.get(f"{self.api_url}/team-members/{member_id}", timeout=10)
                    if response.status_code == 200:
                        self.log_test("Get Specific Team Member", True)
                    else:
                        self.log_test("Get Specific Team Member", False, f"Status code: {response.status_code}")
                    
                    # Test UPDATE member
                    update_data = {"name_en": "Updated Test Member", "name_ru": "Updated Test Member"}
                    response = requests.put(f"{self.api_url}/team-members/{member_id}", json=update_data, timeout=10)
                    if response.status_code == 200:
                        updated_member = response.json()
                        if updated_member.get("name_en") == "Updated Test Member":
                            self.log_test("Update Team Member", True)
                        else:
                            self.log_test("Update Team Member", False, "Name not updated")
                    else:
                        self.log_test("Update Team Member", False, f"Status code: {response.status_code}")
                    
                    # Test DELETE member
                    response = requests.delete(f"{self.api_url}/team-members/{member_id}", timeout=10)
                    if response.status_code == 200:
                        self.log_test("Delete Team Member", True)
                    else:
                        self.log_test("Delete Team Member", False, f"Status code: {response.status_code}")
                    
                    return True
                else:
                    self.log_test("Create Team Member", False, "No ID in response")
                    return False
            else:
                self.log_test("Create Team Member", False, f"Status code: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("Create Team Member", False, f"Error: {str(e)}")
            return False

    def test_image_upload(self):
        """Test image upload functionality"""
        try:
            # Create a simple test image (1x1 PNG)
            import io
            from PIL import Image
            
            # Create a small test image
            img = Image.new('RGB', (100, 100), color='red')
            img_bytes = io.BytesIO()
            img.save(img_bytes, format='PNG')
            img_bytes.seek(0)
            
            files = {'file': ('test.png', img_bytes, 'image/png')}
            response = requests.post(f"{self.api_url}/upload-image", files=files, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("url") and data.get("filename"):
                    self.log_test("Image Upload", True, f"Uploaded: {data['filename']}")
                    return True
                else:
                    self.log_test("Image Upload", False, f"Invalid response structure: {data}")
                    return False
            else:
                self.log_test("Image Upload", False, f"Status code: {response.status_code}, Response: {response.text}")
                return False
        except ImportError:
            self.log_test("Image Upload", False, "PIL not available, skipping image upload test")
            return False
        except Exception as e:
            self.log_test("Image Upload", False, f"Error: {str(e)}")
            return False

    def test_about_settings(self):
        """Test About settings API"""
        try:
            # Test GET about settings
            response = requests.get(f"{self.api_url}/about-settings", timeout=10)
            if response.status_code == 200:
                settings = response.json()
                if settings.get("badge") and settings.get("title") and settings.get("features"):
                    self.log_test("Get About Settings", True, f"Found settings with {len(settings.get('features', []))} features")
                    
                    # Test UPDATE about settings
                    update_data = {
                        "badge": "Updated About Us",
                        "title": "Updated What is",
                        "title_highlight": "FOMO Updated"
                    }
                    response = requests.put(f"{self.api_url}/about-settings", json=update_data, timeout=10)
                    if response.status_code == 200:
                        updated_settings = response.json()
                        if updated_settings.get("badge") == "Updated About Us":
                            self.log_test("Update About Settings", True)
                            
                            # Restore original settings
                            restore_data = {
                                "badge": "About Us",
                                "title": "What is",
                                "title_highlight": "FOMO"
                            }
                            requests.put(f"{self.api_url}/about-settings", json=restore_data, timeout=10)
                            return True
                        else:
                            self.log_test("Update About Settings", False, "Settings not updated properly")
                            return False
                    else:
                        self.log_test("Update About Settings", False, f"Status code: {response.status_code}")
                        return False
                else:
                    self.log_test("Get About Settings", False, f"Invalid settings structure: {settings}")
                    return False
            else:
                self.log_test("Get About Settings", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Get About Settings", False, f"Error: {str(e)}")
            return False

    def test_status_endpoints(self):
        """Test status check endpoints"""
        try:
            # Test CREATE status
            status_data = {"client_name": "test_client"}
            response = requests.post(f"{self.api_url}/status", json=status_data, timeout=10)
            
            if response.status_code == 200:
                created_status = response.json()
                if created_status.get("id") and created_status.get("client_name") == "test_client":
                    self.log_test("Create Status Check", True)
                    
                    # Test GET status checks
                    response = requests.get(f"{self.api_url}/status", timeout=10)
                    if response.status_code == 200:
                        statuses = response.json()
                        if len(statuses) > 0:
                            self.log_test("Get Status Checks", True, f"Found {len(statuses)} status checks")
                        else:
                            self.log_test("Get Status Checks", False, "No status checks found")
                    else:
                        self.log_test("Get Status Checks", False, f"Status code: {response.status_code}")
                    
                    return True
                else:
                    self.log_test("Create Status Check", False, f"Invalid response: {created_status}")
                    return False
            else:
                self.log_test("Create Status Check", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Create Status Check", False, f"Error: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting FOMO Backend API Tests...")
        print(f"🌐 Testing API at: {self.api_url}")
        print("=" * 60)
        
        # Test basic connectivity first
        if not self.test_basic_connectivity():
            print("❌ Basic connectivity failed. Stopping tests.")
            return False
        
        # Test admin authentication
        self.test_admin_login()
        self.test_admin_login_wrong_password()
        
        # Test drawer cards CRUD
        self.test_drawer_cards_crud()
        
        # Test team members CRUD
        self.test_team_members_crud()
        
        # Test image upload
        self.test_image_upload()
        
        # Test about settings
        self.test_about_settings()
        
        # Test status endpoints
        self.test_status_endpoints()
        
        # Print summary
        print("=" * 60)
        print(f"📊 Test Summary:")
        print(f"   Total Tests: {self.tests_run}")
        print(f"   Passed: {self.tests_passed}")
        print(f"   Failed: {self.tests_run - self.tests_passed}")
        print(f"   Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        return self.tests_passed == self.tests_run

    def get_test_results(self):
        """Get detailed test results"""
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "failed_tests": self.tests_run - self.tests_passed,
            "success_rate": (self.tests_passed/self.tests_run*100) if self.tests_run > 0 else 0,
            "test_details": self.test_results
        }

def main():
    tester = FOMOBackendTester()
    success = tester.run_all_tests()
    
    # Save results to file
    results = tester.get_test_results()
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())