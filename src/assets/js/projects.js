// JSX Adobe - PS script
// Blender BLISS animation
// Kotlin - Tuborg mobile app
export default {
  "list" : [
    {
      "id": 0,
      "name": "Peafowl Consulting",
      "summary": "Corporate website for a consulting company",
      "year": 2016,
      "major": false,
      "description": "<p>Peafowl Consulting is a company which offers tests and trainings to reinforce sale teams and colleagues' engagement.</p><p>Furthermore, Peafowl Consulting counts few side projects: Peafowl Foundation (charity project), PTalk (entrepreneur talks), Peafowl Cup (sponsored sport events) and punctual events.</p><p>I drew the graphic guideline and developed the website. I also worked on the logo of the two spin-off projects Peafowl Foundation & P-Talk.</p><p>Finally, I proposed layouts for training supports and internal documents.</p>",
      "design": "<p>I drew the graphic guideline and developed the website. I also worked on the logo of the two spin-off projects Peafowl Foundation & P-Talk.</p><p>Finally, I proposed layouts for training supports and internal documents.</p><p>For the kick-off event, I made few proposals and experimentations for the invitations. We wanted something prestigious and refined. After few attempts with the laser cut, I finally came for for a printed version, with golden letters; the laser cut was not properly calibrated to get satisfying results.</p>",
      "code": "The website is based on PHP and bootstrap.",
      "link": "http://www.peafowl-consulting.com/",
      "category": "Freelance",
      "group": "freelance",
      "slug": "peafowl",
      "images": ["homepage",{url:"cover", caption: "Cover of the Graphic Guideline"}, {url:"table_content", caption: "Table of content"}, {url:"indesign_capture", caption: "Designing the Guideline with InDesign"}, {url:"card", caption: "Invitation card, made with a laser cut"}],
      "software": {
        "n/a": false,
        "list": ["photoshop", "illustrator", "indesign"],
        "position": {x: 800, y: 1, z: -100}
      },
      "techno": {
        "n/a": false,
        "list": ["Bootstrap", "PHP"],
        "position": {x: 990, y: 400, z: -620}
      },
      "timeline": {
        "n/a": false,
        "onlyTimeline": false,
        "startingYear": 2016.7,
        "len": .3,
        "thread": "second",
        "type": "duration",
      }


    // }, {
    //   "id": 1,
    //   "name": "Eneom",
    //   "year": 2016,
    //   "description": "<p>Eneom is a company that sells solutions to save and optimize energy consumption for your home.</p><p> I worked on the onoe-page website along with the design of the materials.</p>",
    //   "code": "Based on Bootstrap",
    //   "design": "Simple",
    //   "slug": "eneom",
    //   "software": ["AI", "PS"],
    //   "link": "https://www.eneom.fr/",
    //   "screenImg": "homepage.png",
    //   "techno": ["Bootstrap", "PHP"],
    //   "category": "Freelance",
    //   "onlyTimeline": false
    }, {
      "id": 2,
      "name": "Go Mékong Evasion",
      "summary": "Wordpress website for a travel agency",
      "year": 2017,
      "major": false,
      "description": "<p>Go Mékong Evasion (GME) is a travel agency that bring travelers off the beaten track and go into Mekong depths.</p>",
      "code": "The website is based on Wordpress, to allow the client to easily edit the content.",
      "design": "<p> For this client, I realized the graphic identity, through the webdesign and the few printed leaflets.</p><p> Since GME offers off the beaten track trips, I opted for these elements: \"gritty/muddy\", hand-drawing (traveler notebook), polaroid effect, maps and full size images. And I kept a touch of security to reassure the tourist. </p>",
      "link": "https://www.gomekongevasion.fr/",
      "slug": "gme",
      "images": ["GME-fullpage", "circuit_and_detailPage",{url:"catalog01", caption: "Print leaflet - for commercial usage"}, {url:"medley", caption: "Lots of handdrawings to illustrate the trips"}],
      "category": "Freelance",
      "group": "freelance",
      "timeline": {
        "n/a": false,
        "onlyTimeline": false,
        "startingYear": 2018.2,
        "len": 1,
        "thread": "second",
        "type": "duration",
      },
      "software": {
        "n/a": false,
        "list": ["photoshop", "illustrator", "indesign"],
        "position": {x: 1000, y: 1, z: 160}
      },
      "techno": {
        "n/a": false,
        "list": ["PHP", "Wordpress", "Bootstrap"],
        "position": {x: 190, y: 400, z: -680}
      }
    }, {
      "id": 3,
      "name": "ctOS",
      "major": false,
      "summary": "Personal project to build my own map system",
      "objectives": "ES6, class constructor, VueJS",
      "year": 2018,
      "description": "<p>This is a personal project to create my own map system – in place of Google Maps. The project includes design of the elements and coding.</p><h4>Motivations</h4><ul><li>Getting out of Google Maps</li><li>Geography and mapping</li><li>Mapbox and HTML Canvas</li><li>Learning VueJS</li></ul>",
      "code": "<p>Mapbox is used as the map engine, plus for the tileset (made with Mapbox Studio) and the dataset API.</p><p>VueJS on the other hand takes care of reactiveness, especially regarding the list rendering and filtering.</p><p>I used Webpack to minify and compress all the assets; however, since it's a personal project, I din't use Babel or try to use ES5 syntax specifically.</p>",
      "design": "<p>I designed all the map components (background, road hierarchy, rivers, marker, popup...) and all the interface elements (menus, listing, item, icons...).</p>Since it's a personal tool, I didn't want to go for a \"fancy\" and catchy interface, but much rather for a technical, terminal-based, effective and somewhat esoteric design. I went for a scify-inspired theme, with many influences coming from Arkham Knight, Cyberpunk 2077, the Martian, Tron, Oblivion or Halo Wars (actually many projects from GMUNK [+link] ).</p><p>An important part of the design was to build a consistent color, icon and shape system. They intend to convey states, hierarchy, triggers and expected actions</p>",
      "slug": "ctos",
      "images": ["desktop_tactical", {url:"fullMap_contrast", caption: "It comes with different map styles, depending on the needs"}, {url:"graphic_research_markers", caption: "Lots of graphic researches for styles and icons"}, {url:"graphic_research_surchaging", caption:"Same for all the other graphic components"}],
      "link": "https://projets.richebois.fr/citadelle/map/mobile.php",
      "category": "Personal",
      "group": "perso",
      "timeline": {
        "onlyTimeline": false,
        "startingYear": 2018.8,
        "len": 1.2,
        "thread": "second",
        "type": "duration"
      },
      "software": {
        "n/a": false,
        "list": ["illustrator"],
        "position": {x: -100, y: 1, z: 300}
      },
      "techno": {
        "n/a": false,
        "list": ["js", "Mapbox", "PHP", "Vue", "Webpack", "Gulp"],
        "position": {x: 270, y: 1, z: 280}
      }

    }, {
      "id": 4,
      "name": "Tool explorer",
      "major": false,
      "summary": "Personal project to map useful web dev common services",
      "objectives": "Data vizualisation and Graph, VueJS, canvas",
      "year": 2019,
      "description": "<p>Web tools are countless. And part of my job as a web developer is to use the right tool at the right moment for the right job. It's hard to keep track of all of them; that why I started this tool. It intends to map all the tools I used or heard about and to display them in an comprehensive way, highlighting the relations between them.</p><h4>Motivations</h4><ul><li>HTMLCanvas</li><li>Working on data vizualization</li><li>A suitable tool to organize all softwares and libs</li></ul>",
      "code": "Since this is not a simple parent-children relation (which is a Tree), I opted for VisJS with its Graph and Network data structure - based on relations and groups rather than inheritance. And VueJS takes care of list rendering (again) and data biding.",
      "design": "Inspired by WestWorld UI graphic and their \"character response scenario\", I wanted to reproduce the navigation flow, with columns and left-to-right paths. However, usability was better with non-oriented flow.<br>And recently I found a project that interwines graph solver and ThreeJS; I'm considering migrating to unleash the potential of rendering graph in full 3D.",
      "screenImg": "homepage.png",
      "slug": "datavis",
      "link": "",
      "category": "Personal",
      "timeline": {
        "onlyTimeline": false,
      },
      "software": {
        "n/a": true,
        "list": ["illustrator"],
        "position": {x: 1, y: 1, z: 1}
      },
      "techno": {
        "n/a": false,
        "list": ["vis", "Vue"],
        "position": {x: 580, y: 1, z: -400}
      }

    }, {
      "id": 5,
      "name": "Takacorp Studio",
      "major": true,
      "summary": "E-commerce website for manga products",
      "year": 2018,
      "description": "<p>Takacorp is a e-commerce website that sell high quality manga figurines. For this website, I realized all the design and all the development.</p><p>Let’s face it: payment was a big challenge, on the ground that the website accepts 3 different types of payment (Stripe, Monetico and Paypal), by card, Paypal and with staggered payment for 2, 3, 4 and 10 months. Moreover, the website is also SCA compliant - the new European payment regulation. I learnt a lot about Stripe API, webhooks, routing, banking regulations and such.</p>",
      "design": "<p>There were two parts:<br>First I drew up a document that exposes the design intentions and principles.</p><p>Over a second phase, I realized the detailed design guideline document that contain the mockups of all the pages. It implies the design of all the individual components, plus the color and font system.</p><p>Regarding the guideline, I defined 2 main directions: staging the products and \"a website made by fans for fans\".<br> Manga is a visual medium; it's all about animation, storytelling and rhythm. The website had to use the same codes. The focus was to stage the products, through layout, animations and visuals.</p>",
      "code": "<p>I chose Ruby on Rails for its robustness and as a reliable backend framework; it offers many built-in tools for security, assets management, routing and optimisations.</p><h4>DevOps</h4><p>Takacorp is hosted on Heroku – a serverless solution easy to manage, to scale and affordable for starting businesses.<br>AWS is used for storage (S3) and MailGun for transactional emails. And source code is maintained with git on an independent repository.</p>",
      "link": "https://takacorp.herokuapp.com",
      "images": ["Taka_webdesign_homepage",{url:"Taka_webdesign",caption:"I started with a \"Design Principle\"  document, and then turned it into a proper webdesign guideline"}, {url:"UI_page",caption:"UI components of the pages"}],
      "slug": "taka",
      "category": "Personal",
      "group": "freelance",
      "timeline": {
        "onlyTimeline": false,
        "startingYear": 2018.7,
        "len": 1.2,
        "thread": "second",
        "type": "duration"
      },
      "software": {
        "n/a": false,
        "list": ["illustrator", "Photoshop"],
        "position": {x: -100, y: 1, z: -600}
      },
      "techno": {
        "n/a": false,
        "list": ["ruby", "js"],
        "position": {x: 1300, y: 1, z: 280}
      }
    }, {
      "id": 6,
      "name": "Uptime checker",
      "major": false,
      "summary": "Internal tool to track uptime website and domain names",
      "description": "<p>Uptime Checker is an internal tool to monitor and get notified if one of the website we're managing is down.</p><h4>Coding motivations</h4><ul><li>Learning Python + micro framework (Flask)</li><li>Reactive app and xhr calls</li></ul>",
      "year": 2019,
      "code": "I was familiar with Vue already, so I opted for this techno since it's mainly llist management (with filtering).</p><p>Backend was limited, and only required simple routing and API-like response with sqlite queires returned as JSON.</p><p>For the uptime tool itsellf, it's all written in Python3 (using request, sqlite3 and STMP for notification email), set on a CRON job running every 15min.</p>",
      "link": "",
      "slug": "uptime",
      "images": ["screenshot", "popup", {url:"flow",caption:"Flow of the webapp - to have a clear overview before starting development"}],
      "category": "BLISS",
      "group": "work",
      "timeline": {
        "onlyTimeline": false,
        "startingYear": 2019.4,
        "len": .2,
        "thread": "second",
        "type": "duration",
      },
      "software": {
        "n/a": true,
        "list": [],
        "position": {x: 1, y: 1, z: 1}
      },
      "techno": {
        "n/a": false,
        "list": ["Python", "Flask", "Vue"],
        "position": {x: 70, y: 1, z: -140}
      }
    }, {
      "id": 7,
      "name": "Geography studies",
      "major": false,
      "summary": "Degree in Geography",
      "group": "study",
      "timeline": {
        "onlyTimeline": true,
        "startingYear": 2009.7,
        "len": 4,
        "thread": "main",
        "type": "duration",
        "children": [
          {
            "name": "Licence (Paris Sorbonne, France)",
            "startingYear": 2009.7,
            "len": 3,
            "thread": "main",
            "group": "study",
            "type": "duration",
            "onlyTimeline": true,
            "level": 2
          }, {
            "name": "certificate (Montreal, Canada)",
            "startingYear": 2011.7,
            "len": 1,
            "thread": "main",
            "group": "study",
            "type": "duration",
            "onlyTimeline": true,
            "level": 3
          }, {
            "name": "Maitrise (Paris Sorbonne, France)",
            "startingYear": 2012.7,
            "len": 1,
            "thread": "main",
            "group": "study",
            "type": "duration",
            "onlyTimeline": true,
            "level": 2
          }
        ]
      },
      "software": {
        "n/a": true,
        "list": [],
        "position": {x: 1, y: 1, z: 1}
      },
      "techno": {
        "n/a": true,
        "list": [],
        "position": {x: 1, y: 1, z: 1}
      }

    }, {
      "id": 8,
      "name": "Master (EMLyon & Centrale Lyon)",
      "major": false,
      "summary": "Master degree in Entrepreneuship and Design",
      "group": "study",
      "timeline": {
        "startingYear": 2013.7,
        "len": 2,
        "thread": "main",
        "type": "duration",
        "onlyTimeline": true,
      },
      "software": {
        "n/a": true,
        "list": [],
        "position": {x: 1, y: 1, z: 1}
      },
      "techno": {
        "n/a": true,
        "list": [],
        "position": {x: 1, y: 1, z: 1}
      }
    }, {
      "id": 9,
      "name": "Internship - CAPSA Container",
      "summary": "Intership",
      "description": "With essay", // DON't FORGET THE MEMOIRE
      "group": "work",
      "timeline": {
        "startingYear": 2014.5,
        "len": .5,
        "thread": "second",
        "type": "duration",
        "onlyTimeline": true,
      },
      "software": {
        "n/a": false,
        "list": ["photoshop", "illustrator", "indesign"],
        "position": {x: 900, y: 300, z: -360}
      },
      "techno": {
        "n/a": true,
        "list": [],
        "position": {x: 580, y: 1, z: -200}
      }

    }, {
      "id": 10,
      "name": "Diplome Master",
      "major": false,
      "summary": "End of Master degree",
      "group": "study",
      "timeline": {
        "startingYear": 2015,
        "len": 2,
        "thread": "main",
        "type": "event",
        "onlyTimeline": true,
      },
      "software": {
        "n/a": true,
        "position": {x: 1, y: 1, z: 1}
      },
      "techno": {
        "n/a": true,
        "position": {x: 1, y: 1, z: 1}
      }
    }, {
      "id": 11,
      "name": "freelance",
      "major": false,
      "summary": "Various web development jobs",
      "group": "work",
      "timeline": {
        "startingYear": 2016,
        "len": 1,
        "thread": "main",
        "type": "duration",
        "onlyTimeline": true,
      },
      "software": {
        "n/a": true,
        "list": [],
        "position": {x: 1, y: 1, z: 1}
      },
      "techno": {
        "n/a": true,
        "list": [],
        "position": {x: 1, y: 1, z: 1}
      }
    }, {
      "id": 12,
      "name": "MonMentor",
      "major": false,
      "summary": "Platform/marketplace to match mentors and learners",
      "group": "work",
      "timeline": {
        "startingYear": 2015,
        "len": .5,
        "thread": "second",
        "type": "duration",
        "onlyTimeline": true,
      },
      "software": {
        "n/a": false,
        "list": ["illustrator"],
        "position": {x: 40, y: 1, z: -80}
      },
      "techno": {
        "n/a": false,
        "list": ["Bootstrap", "JS", "Ruby"],
        "position": {x: 1700, y: 1, z: 240}
      }
    }, {
      "id": 13,
      "name": "Kicklaws",
      "major": false,
      "summary": "Web platform where opinions matter",
      "group": "work",
      "timeline": {
        "startingYear": 2015.5,
        "len": .5,
        "thread": "second",
        "type": "duration",
        "onlyTimeline": true,
      },
      "software": {
        "n/a": true,
        "list": [],
        "position": {x: 1, y: 1, z: 1}
      },
      "techno": {
        "n/a": false,
        "list": ["Bootstrap", "PHP", "ruby"],
        "position": {x: 1200, y: 1, z: -280}
      }
    }, {
      "id": 14,
      "name": "Vietnam",
      "major": false,
      "summary": "4 years spent in Ho Chi Minh City",
      "slug": "vietnam",
      "images": ["saigon"],
      "group": "perso",
      "timeline": {
        "startingYear": 2016,
        "len": 4,
        "thread": "main",
        "type": "duration",
        "onlyTimeline": true,
      },
      "software": {
        "n/a": true,
        "position": {x: 1, y: 1, z: 1}
      },
      "techno": {
        "n/a": true,
        "position": {x: 1, y: 1, z: 1}
      }
    }, {
      "id": 15,
      "name": "BLISS",
      "description": "I worked for almost 4 years at BLISS interactive as project manager and digital producer. Besides that, I worked on improving internal processes and developing tools to make recurrent tasks easier.",
      "major": true,
      "slug": "bliss",
      "images": [{url:"rate_card",caption:"I worked o a card rate, which can be adapted from a simple Google Sheet - which then generates a PPT presentation using the Google API."},{url:"hanbook_mockup", caption: "To accelerate on boarding for new comers, I designed a handbook with an overview of the company and all the best practices"}, {url:"office_iso",caption:"This isometric map was the illustration of our office for the BLISS Handbook"}],
      "group": "work",
      "timeline": {
        "startingYear": 2017,
        "len": 3,
        "thread": "main",
        "type": "duration",
        "onlyTimeline": true,
      },
      "software": {
        "n/a": true,
        "position": {x: 1, y: 1, z: 1}
      },
      "techno": {
        "n/a": true,
        "position": {x: 1, y: 1, z: 1}
      }
    }, {
      "id": 16,
      "name": "Year of Engineering",
      "major": false,
      "slug": "yoe",
      "images": [{url:"techno_approch",caption:"Diagram to describe the technical stack to the cllient"}, {url:"openbadges",caption:"Sitemap & wireframe for a change request - integrating a new Badge"}],
      "summary": "UK government project to promote engineering",
      "group": "work",
      "timeline": {
        "startingYear": 2017.8,
        "len": 1,
        "thread": "second",
        "type": "duration",
        "onlyTimeline": true,
      },
      "software": {
        "n/a": false,
        "list": ["illustrator"],
        "position": {x: -300, y: 1, z: 600}
      },
      "techno": {
        "n/a": false,
        "list": ["JS", "React"],
        "position": {x: 0, y: 1, z: 130}
      }
    }, {
      "id": 17,
      "name": "CCM",
      "major": false,
      "summary": "Internal tool to manage creative process",
      "description": "<p>This is another internal too, developed to manage creative process. I worked as Project Manager on this job, and as secondary developer - for minor tasks and adapting feedback.</p><p>I also wrote all the documentation to facilitate team's onboarding - and to keep track of the changes. I used to <span class=\"abbr\" title=\"Facebook's documentation library, based on React\">Docusaursu</span> to handle the documentation.</p>",
      "slug": "ccm",
      "images": [{url:"flow-overall",caption:"roles and permission diagram"}],
      "group": "work",
      "code": "It's based on Laravel for backend and on React (+ Next) for the FE.",
      "timeline": {
        "startingYear": 2019.4,
        "len": .6,
        "thread": "second",
        "type": "duration",
        "onlyTimeline": true,
      },
      "software": {
        "n/a": false,
        "list": ["illustrator"],
        "position": {x: -365, y: 200, z: 120}
      },
      "techno": {
        "n/a": false,
        "list": ["JS", "React"],
        "position": {x: 485, y: 1, z: 420}
      }
    }, {
      "id": 18,
      "name": "BLISS - Identidy and branding",
      "major": true,
      "slug": "bliss",
      "images": [{url:"rate_card",caption:"I worked o a card rate, which can be adapted from a simple Google Sheet - which then generates a PPT presentation using the Google API."},{url:"hanbook_mockup", caption: "To accelerate on boarding for new comers, I designed a handbook with an overview of the company and all the best practices"}, {url:"office_iso",caption:"This isometric map was the illustration of our office for the BLISS Handbook"}],
      "summary": "Developping company brand and culture",
      "description": "3D video rendering",
      "group": "work",
      "timeline": {
        "startingYear": 2019,
        "len": 2,
        "thread": "second",
        "type": "duration",
        "onlyTimeline": true,
      },
      "software": {
        "n/a": false,
        "list": ["photoshop", "illustrator", "indesign"],
        "position": {x: 430, y: 300, z: -60}
      },
      "techno": {
        "n/a": true,
        "list": ["JS", "React", "Chrome", "Webpack"],
        "position": {x: 1, y: 1, z: 1}
      }
    }, {
      "id": 19,
      "name": "Chrome Extension",
      "major": false,
      "summary": "Internal projet to enhance an existing booking management service",
      "description": "I built up a Chrome Extension to enhance an internal tool used for time management and tracking. The extension intended to overcome some missing features, such as the ability to color and filter bookings based upon defined Tags and Phases.",
      "year": 2020,
      "group": "work",
      "timeline": {
        "startingYear": 2020.1,
        "len": 0.4,
        "thread": "second",
        "type": "duration",
        "onlyTimeline": false,
      },
      "software": {
        "n/a": true,
        "position": {x: 1, y: 1, z: 1}
      },
      "techno": {
        "n/a": false,
        "list": ["JS", "Chrome"],
        "position": {x: 880, y: 1, z: -110}
      }
    }, {
      "id": 20,
      "name": "Family Medical Practice",
      "major": true,
      "summary": "Website revamping for the largest care provider in Vietnam",
      "description": "FMP is a Vietnamese health provider. We revamp their website, both design and coding.",
      "code": "Powered by React and NextJS (and Wagtail for the CMS), the new website intended to be reactive and dynamic. While I din't work on the set up, I developed a large part of the website and handled most of the later change requests.",
      "design": "I design only few elements of the website. However, I built a large part of the website structure, coming up with sitemap, wireframes and flows",
      "slug": "fmp",
      "images": [{url:"FMP_sitemap",caption:"Sitemap of the new website"},{url:"routing-history_page", caption: "I worked on many documents to explain clearly what we were going to build for the client"}, {url:"supplierAPI-flow",caption:"We worked with some suppliers, and I documented to faciitate the integration"}, {url:"flow-book_doctor",caption:"For each change requests, I made some wireframes and mockups to help the design department"}],
      "group": "work",
      "timeline": {
        "startingYear": 2019.6,
        "len": 1.2,
        "thread": "second",
        "type": "duration",
        "onlyTimeline": false,
      },
      "software": {
        "n/a": false,
        "list": ["photoshop", "illustrator"],
        "position": {x: 320, y: 1, z: 290}
      },
      "techno": {
        "n/a": false,
        "list": ["js", "React"],
        "position": {x: 650, y: 1, z: 330}
      }
    }, {
      "id": 21,
      "name": "Portfolio",
      "major": false,
      "summary": "About this website",
      "objectives": "ThreeJS, Webpack, advanced maths",
      "year": 2019,
      "description": "<p>TBC</p>",
      "code": "<p>I modified the original Orbit.js file, in order to limit the camera movement and to allow more interaction with zoom (mousewheel)</p><p>I used <a href=\"https://css-tricks.com/svg-symbol-good-choice-icons/\">SVGstore</a> to concat all SVG as one big file (≈34 SVG for 71KB), allowing then to display them with &lt;symbol&gt; elements (via Gulp)</p><p>Webpack is used resolve <code>import</code> and <code>requires</code>, plus to minify and \"Tree shaking\" (for dead-code elimination).</p><p>Finally, TweenMax (GSAP) animate projects when changing the filters.</p>",
      "design": "<p>I initially prototype on Illustrator to get the right design.</p>",
      "link": "https://richebois.fr",
      "category": "Personal",
      "group": "freelance",
      "timeline": {
        "onlyTimeline": false,
        "startingYear": 2019.7,
        "len": 1.2,
        "thread": "second",
        "type": "duration",

      },
      "software": {
        "n/a": false,
        "list": ["photoshop", "illustrator"],
        "position": {x: 220, y: 1, z: 490}
      },
      "techno": {
        "n/a": false,
        "list": ["JS", "vue", "webpack", "three", "greensock", "Gulp"],
        "position": {x: 900, y: 1, z: 200}
      }
    }, {
      "id": 22,
      "name": "Tran Duong",
      "major": false,
      "summary": "A Vietnamese supplyer and constructer of high-class wallpaper and curtains",
      "slug": "td",
      "images": ["products-page", {url:"TD-photoshop",caption:"Photoshop file"}],
      "objectives": null,
      "year": 2020,
      "description": "<p>TBC</p>",
      "code": "TBC",
      "design": "TBC",
      "link": "https://tranduongco.vn/",
      "category": "Freelance",
      "group": "freelance",
      "timeline": {
        "onlyTimeline": false,
        "startingYear": 2020.3,
        "len": 0.2,
        "thread": "second",
        "type": "duration",
      },
      "software": {
        "n/a": false,
        "list": ["photoshop"],
        "position": {x: 780, y: 1, z: 480}
      },
      "techno": {
        "n/a": true,
        "list": [],
        "position": {x: 800, y: 1, z: 200}
      }
    }, {
      "id": 23,
      "name": "Minh Minh Nhut",
      "major": false,
      "summary": "Minh Minh Nhut supplies, manufactures paper bags/boxes and label tags industry.",
      "description": "I revamped their web design.",
      "design": "I took inspiration from the print industry: bleeds and print mark, paper texture and Material Design (from Google) for the metaphor of texture.",
      "objectives": null,
      "year": 2020,
      "description": "<p>TBC</p>",
      "design": "TBC",
      "link": "https://minhminhnhut.com/",
      "slug": "mmi",
      "images": ["products-page", {url:"MMI_ps",caption:"Photoshop file"}],
      "category": "Freelance",
      "group": "freelance",
      "timeline": {
        "onlyTimeline": false,
        "startingYear": 2020.3,
        "len": 0.2,
        "thread": "second",
        "type": "duration",
      },
      "software": {
        "n/a": false,
        "list": ["photoshop"],
        "position": {x: 1200, y: 1, z: 330}
      },
      "techno": {
        "n/a": true,
        "list": [],
        "position": {x: 900, y: 1, z: 200}
      }
    }, {
      "id": 24,
      "name": "Spotify Campaign",
      "major": false,
      "summary": "Minh Minh Nhut supplies, manufactures paper bags/boxes and label tags industry.",
      "description": "I revamped their web design.",
      "design": "I took inspiration from the print industry: bleeds and print mark, paper texture and Material Design (from Google) for the metaphor of texture.",
      "objectives": "Trying parcel, multilingual with Vue",
      "year": 2020,
      "description": "<p>TBC</p>",
      "code": "TBC",
      "link": "https://spotify-fan.com/",
      "screenImg": "homepage.png",
      "slug": "spotify/",
      "category": "main",
      "group": "freelance",
      "timeline": {
        "onlyTimeline": false,
        "startingYear": 2020.6,
        "len": 0.2,
        "thread": "second",
        "type": "duration",
      },
      "software": {
        "n/a": true,
        "list": [],
        "position": {x: 1200, y: 1, z: 330}
      },
      "techno": {
        "n/a": false,
        "list": ["Python", "Flask", "Vue", "Parcel"],
        "position": {x: 160, y: 1, z: -400}
      }
    }
  ],
  "symbols": {
    "techno": [
      {
        "name": "Javascript",
        "position": {x: 500, y: 1, z: 60},
        "icon": "js"
      }, {
        "name": "Python",
        "position": {x: -165, y: 1, z: -310},
        "icon": "python"
      }, {
        "name": "Ruby on Rails",
        "position": {x: 1500, y: 1, z: -40},
        "icon": "ruby"
      }, {
        "name": "PHP",
        "position": {x: 600, y: 400, z: -440},
        "icon": "php"
      },
    ],
    "software": [
      {
        "name": "Illustrator",
        "position": {x: 200, y: 280, z: -160},
        "icon": "illustrator"
        // "icon": "illustrator.svg"
      }, {
        "name": "Sketch",
        "position": {x: -400, y: 200, z: -80},
        "icon": "sketch"
      }, {
        "name": "InDesign",
        "position": {x: 700, y: 1, z: -760},
        "icon": "indesign"
      }, {
        "name": "Photoshop",
        "position": {x: 740, y: 1, z: 280},
        "icon": "photoshop"
      }, {
        "name": "Blender",
        "position": {x: 1400, y: 350, z: -160},
        "icon": "blender"
      }
    ],
  },
  "bounds": {
    "techno": [],
    "software": [],
    "timeline": [],
  }
}