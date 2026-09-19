"""Mock data layer for Contacts Management Application.

Provides realistic mock contact profiles and email address records matching
the Figma design and exercise specifications.
"""

CONTACTS = [
    {
        "id": "1",
        "first_name": "Johanna",
        "last_name": "Stevens",
        "name": "Johanna Stevens",
        "company": "WhiteUI Studio",
        "job_title": "UI/UX Designer",
        "phone": "439-582-1578",
        "address": "742 Evergreen Terrace, Springfield, OR 97477",
        "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
        "status": "online",
        "bio": "When I first got into the advertising, I was looking for the magical combination that would put website into the top search engine rankings",
        "dial": "j.stevens@ymsg.com",
        "meeting_url": "http://go.betacall.com/meet/j.stevens",
        "phone_numbers": [
            {"number": "439-582-1578", "is_primary": True},
            {"number": "621-770-7689", "is_primary": False}
        ],
        "social_links": {
            "facebook": "https://facebook.com/johannastevens",
            "pinterest": "https://pinterest.com/johannastevens",
            "twitter": "https://twitter.com/johannastevens",
            "linkedin": "https://linkedin.com/in/johannastevens",
            "google": "https://plus.google.com/johannastevens"
        }
    },
    {
        "id": "2",
        "first_name": "Nicholas",
        "last_name": "Gordon",
        "name": "Nicholas Gordon",
        "company": "TechCorp Systems",
        "job_title": "Developer",
        "phone": "555-234-8901",
        "address": "1200 Innovation Way, Austin, TX 78701",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        "status": "online",
        "bio": "Senior full-stack engineer passionate about scalable cloud architectures, high performance microservices, and elegant UI interfaces.",
        "dial": "n.gordon@ymsg.com",
        "meeting_url": "http://go.betacall.com/meet/n.gordon",
        "phone_numbers": [
            {"number": "555-234-8901", "is_primary": True},
            {"number": "555-876-5432", "is_primary": False}
        ],
        "social_links": {
            "facebook": "https://facebook.com",
            "pinterest": "https://pinterest.com",
            "twitter": "https://twitter.com",
            "linkedin": "https://linkedin.com",
            "google": "https://google.com"
        }
    },
    {
        "id": "3",
        "first_name": "Bradley",
        "last_name": "Malone",
        "name": "Bradley Malone",
        "company": "SalesLead Pro",
        "job_title": "Sales Manager",
        "phone": "415-982-3321",
        "address": "580 Market St, San Francisco, CA 94104",
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
        "status": "away",
        "bio": "Leading strategic enterprise client growth with 8+ years experience closing multi-million SaaS agreements.",
        "dial": "b.malone@ymsg.com",
        "meeting_url": "http://go.betacall.com/meet/b.malone",
        "phone_numbers": [
            {"number": "415-982-3321", "is_primary": True}
        ],
        "social_links": {
            "linkedin": "https://linkedin.com",
            "twitter": "https://twitter.com"
        }
    },
    {
        "id": "4",
        "first_name": "Marvin",
        "last_name": "Lambert",
        "name": "Marvin Lambert",
        "company": "DesignHub Collective",
        "job_title": "Designer",
        "phone": "312-555-0199",
        "address": "333 Michigan Ave, Chicago, IL 60601",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
        "status": "online",
        "bio": "Product designer crafting intuitive user journeys, motion design, and accessible design systems.",
        "dial": "m.lambert@ymsg.com",
        "meeting_url": "http://go.betacall.com/meet/m.lambert",
        "phone_numbers": [
            {"number": "312-555-0199", "is_primary": True}
        ],
        "social_links": {
            "pinterest": "https://pinterest.com",
            "linkedin": "https://linkedin.com"
        }
    },
    {
        "id": "5",
        "first_name": "Teresa",
        "last_name": "Lloyd",
        "name": "Teresa Lloyd",
        "company": "PressWave Global",
        "job_title": "PR agent",
        "phone": "212-555-8841",
        "address": "450 Lexington Ave, New York, NY 10017",
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
        "status": "away",
        "bio": "Media relations strategist connecting disruptive tech brands with global press and influential thought leaders.",
        "dial": "t.lloyd@ymsg.com",
        "meeting_url": "http://go.betacall.com/meet/t.lloyd",
        "phone_numbers": [
            {"number": "212-555-8841", "is_primary": True}
        ],
        "social_links": {
            "twitter": "https://twitter.com",
            "linkedin": "https://linkedin.com"
        }
    },
    {
        "id": "6",
        "first_name": "Fred",
        "last_name": "Haynes",
        "name": "Fred Haynes",
        "company": "CustomerCare Solutions",
        "job_title": "Support Team",
        "phone": "702-555-4321",
        "address": "100 South 4th St, Las Vegas, NV 89101",
        "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
        "status": "online",
        "bio": "Customer success and technical support specialist dedicated to delivering exceptional user resolution experiences.",
        "dial": "f.haynes@ymsg.com",
        "meeting_url": "http://go.betacall.com/meet/f.haynes",
        "phone_numbers": [
            {"number": "702-555-4321", "is_primary": True}
        ],
        "social_links": {
            "linkedin": "https://linkedin.com"
        }
    },
    {
        "id": "7",
        "first_name": "Rose",
        "last_name": "Peters",
        "name": "Rose Peters",
        "company": "DeliveryFlow Agile",
        "job_title": "Project Manager",
        "phone": "617-555-7729",
        "address": "200 State St, Boston, MA 02109",
        "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
        "status": "away",
        "bio": "Agile certified Scrum Master coordinating cross-functional engineering teams to ship high quality products on time.",
        "dial": "r.peters@ymsg.com",
        "meeting_url": "http://go.betacall.com/meet/r.peters",
        "phone_numbers": [
            {"number": "617-555-7729", "is_primary": True}
        ],
        "social_links": {
            "linkedin": "https://linkedin.com"
        }
    },
    {
        "id": "8",
        "first_name": "Brian",
        "last_name": "Watson",
        "name": "Brian Watson",
        "company": "CodeLab Technologies",
        "job_title": "Developer",
        "phone": "503-555-3312",
        "address": "1000 SW Broadway, Portland, OR 97205",
        "avatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80",
        "status": "online",
        "bio": "Frontend specialist focused on Angular, reactive state management, and modern Web APIs.",
        "dial": "b.watson@ymsg.com",
        "meeting_url": "http://go.betacall.com/meet/b.watson",
        "phone_numbers": [
            {"number": "503-555-3312", "is_primary": True}
        ],
        "social_links": {
            "twitter": "https://twitter.com",
            "linkedin": "https://linkedin.com"
        }
    },
    {
        "id": "9",
        "first_name": "Hettie",
        "last_name": "Richardson",
        "name": "Hettie Richardson",
        "company": "SystemsCloud Infrastructure",
        "job_title": "Developer",
        "phone": "415-555-9087",
        "address": "425 Mission St, San Francisco, CA 94105",
        "avatar": "https://images.unsplash.com/photo-1534751516642-a171ed27150a?w=200&auto=format&fit=crop&q=80",
        "status": "online",
        "bio": "Backend and DevOps enthusiast with hands-on expertise in container orchestration and serverless computing.",
        "dial": "h.richardson@ymsg.com",
        "meeting_url": "http://go.betacall.com/meet/h.richardson",
        "phone_numbers": [
            {"number": "415-555-9087", "is_primary": True}
        ],
        "social_links": {
            "twitter": "https://twitter.com",
            "linkedin": "https://linkedin.com"
        }
    }
]

# Mapping of contact_id -> list of email addresses
EMAIL_ADDRESSES = {
    "1": [
        {"id": "e-1-1", "contact_id": "1", "email": "johanna.stevens@gmail.com", "type": "Personal", "is_primary": True},
        {"id": "e-1-2", "contact_id": "1", "email": "johanna.stevens@whiteui.store", "type": "Work", "is_primary": False}
    ],
    "2": [
        {"id": "e-2-1", "contact_id": "2", "email": "nicholas.gordon@techcorp.io", "type": "Work", "is_primary": True},
        {"id": "e-2-2", "contact_id": "2", "email": "n.gordon@gmail.com", "type": "Personal", "is_primary": False}
    ],
    "3": [
        {"id": "e-3-1", "contact_id": "3", "email": "bradley.malone@saleslead.co", "type": "Work", "is_primary": True},
        {"id": "e-3-2", "contact_id": "3", "email": "b.malone@outlook.com", "type": "Personal", "is_primary": False}
    ],
    "4": [
        {"id": "e-4-1", "contact_id": "4", "email": "marvin.lambert@designhub.net", "type": "Work", "is_primary": True},
        {"id": "e-4-2", "contact_id": "4", "email": "m.lambert@artstudio.design", "type": "Portfolio", "is_primary": False}
    ],
    "5": [
        {"id": "e-5-1", "contact_id": "5", "email": "teresa.lloyd@presswave.com", "type": "Work", "is_primary": True},
        {"id": "e-5-2", "contact_id": "5", "email": "teresa.lloyd@gmail.com", "type": "Personal", "is_primary": False}
    ],
    "6": [
        {"id": "e-6-1", "contact_id": "6", "email": "fred.haynes@customercare.org", "type": "Work", "is_primary": True},
        {"id": "e-6-2", "contact_id": "6", "email": "f.haynes.support@helpdesk.io", "type": "Alternate", "is_primary": False}
    ],
    "7": [
        {"id": "e-7-1", "contact_id": "7", "email": "rose.peters@deliveryflow.io", "type": "Work", "is_primary": True},
        {"id": "e-7-2", "contact_id": "7", "email": "rose.peters.pm@gmail.com", "type": "Personal", "is_primary": False}
    ],
    "8": [
        {"id": "e-8-1", "contact_id": "8", "email": "brian.watson@codelab.dev", "type": "Work", "is_primary": True},
        {"id": "e-8-2", "contact_id": "8", "email": "brian.watson@angular-devs.org", "type": "Community", "is_primary": False}
    ],
    "9": [
        {"id": "e-9-1", "contact_id": "9", "email": "hettie.r@systemscloud.com", "type": "Work", "is_primary": True},
        {"id": "e-9-2", "contact_id": "9", "email": "hettie.richardson@devops.net", "type": "Personal", "is_primary": False}
    ]
}
