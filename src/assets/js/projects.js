// JSX Adobe - PS script
// Blender BLISS animation
// Kotlin - Tuborg mobile app
export default {
  "list" : [
    {
      "id": 1,
      "name": "Peafowl Consulting",
      "summary": "Corporate website for a consulting company",
      "year": 2016,
      "major": false,
      "description": "<p>Peafowl Consulting is a company which offers tests and trainings to reinforce sale teams and colleagues' engagement. I designed the graphic guideline and developped the website.</p><p>Furthermore, Peafowl Consulting counts few side projects: Peafowl Foundation (charity project), PTalk (entrepreneur talks), Peafowl Cup (sponsored sport events) and punctual events.</p><p>Finally, I proposed layouts for training supports and internal documents.</p>",
      "design": "<p>I drew the graphic guideline. I also worked on the logo of the two spin-off projects Peafowl Foundation & P-Talk.</p><p>Finally, I proposed layouts for training supports and internal documents.</p><p>For the kick-off event, I made few proposals and experimentations for the invitations. We wanted something prestigious and refined. After few attempts with the laser cut, I finally came for for a printed version, with golden letters; the laser cut was not properly calibrated to get satisfying results.</p>",
      "code": "I developed the website, based on PHP and bootstrap.",
      "link": "http://www.peafowl-consulting.com/",
      "category": "Freelance",
      "cat": "freelance",
      "group": "freelance",
      "slug": "peafowl",
      "images": ["homepage",{url:"cover", caption: "Cover of the Graphic Guideline"}, {url:"table_content", caption: "Table of content"}, {url:"indesign_capture", caption: "Designing the Guideline with InDesign"}, {url:"card", caption: "Invitation card, made with a laser cut"}],
      "software": {
        "n/a": false,
        "list": ["photoshop", "illustrator", "indesign"],
        "position": {x: 170, y: 1, z: -750}
      },
      "techno": {
        "n/a": false,
        "list": ["Bootstrap", "PHP"],
        "position": {x: 990, y: 200, z: -720}
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
      "description": "<p>Go Mékong Evasion (GME) is a travel agency that bring travelers off the beaten track and go into Mekong depths. I worked on both design and website</p>",
      "code": "The website is based on Wordpress, to allow the client to easily edit content (tours and activities).",
      "design": "<p> For this client, I realized the graphic identity, through the webdesign and few different printed documents - leaflets and brochures.</p><p>Since GME offers off the beaten track trips, I opted for these graphic approach: \"gritty/muddy\", hand-drawing (traveler notebook), polaroid effect, maps and full size images; while keeping a touch of \"security\" to reassure the visitors.</p>",
      "link": "https://www.gomekongevasion.fr/",
      "slug": "gme",
      "images": ["GME-fullpage", "circuit_and_detailPage",{url:"catalog01", caption: "Print leaflet - for commercial usage"},"catalog03",{url:"medley", caption: "Lots of handdrawings to illustrate the trips"}],
      "category": "Freelance",
      "cat": "freelance",
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
        "position": {x: 1200, y: 1, z: 20}
      },
      "techno": {
        "n/a": false,
        "list": ["PHP", "Wordpress", "Bootstrap"],
        "position": {x: 190, y: 200, z: -780}
      }
    }, {
      "id": 3,
      "name": "ctOS",
      "major": false,
      "summary": "Personal project to build my own map system",
      "objectives": "ES6, class constructor, VueJS",
      "year": 2018,
      "description": "<p>This is a personal project to create my own map system – in place of Google Maps. The project includes design of the elements and coding.</p><h4>Motivations</h4><ul><li>Getting out of Google Maps</li><li>Geography and mapping</li><li>Mapbox and HTML Canvas</li><li>Learning VueJS</li></ul>",
      "code": "<p>Mapbox is used as the map engine, plus for the tileset (made with Mapbox Studio) and the dataset API.</p><p>VueJS on the other hand takes care of reactiveness, especially regarding the list rendering and filtering.</p><p>I used Webpack to minify and compress all the assets; however, since it's a personal project, I din't use Babel or ES5 polyfills for old browser compatibility.</p>",
      "design": "<p>I designed all the map components (background, road hierarchy, rivers, marker, popup...) and all the interface elements (menus, listing, item, icons...).</p>As a personal tool, I didn't want to go for a \"fancy\" and catchy interface, but much rather for a hightly technical, terminal-based, effective and somewhat esoteric design. I went for a scify-inspired theme, with many influences coming from Arkham Knight, Cyberpunk 2077, the Martian, Tron, Oblivion or Halo Wars (actually many projects from <a href=\"https://gmunk.com/\">GMUNK</a> ).</p><p>An important part of the design was to build a consistent color, icon and shape system. They intend to convey states, hierarchy, triggers and expected actions</p>",
      "slug": "ctos",
      "images": ["desktop_tactical", {url:"contrast-mobile", caption: "It comes with different map styles, depending on the needs. And it was designed \"mobile-first\""}, {url:"graphic_research_markers", caption: "Lots of graphic researches for styles and icons"}, {url:"graphic_research_surchaging", caption:"Same for all the other graphic components"}],
      "link": "https://projets.richebois.fr/citadelle/map/mobile.php",
      "category": "Personal project",
      "cat": "personal",
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
      "description": "<p>Web tools are countless. Part of my job as a web developer and project manager is to use the right tool at the right moment for the right job. It's hard to keep track of all of them; that why I started this personal project. It intends to map all the tools I use or hear about and to display them in an comprehensive way, highlighting the relations between them.</p><h4>Motivations</h4><ul><li>WebGL</li><li>Data vizualization</li><li>A suitable tool to organize all softwares and libs</li></ul>",
      "code": "<p>Since this is not a simple parent-children relation (aka a tree), I opted for VisJS with its Graph and Network data structure - based on relations and groups rather than inheritance. And VueJS takes care of list rendering and data biding.</p><p>And recently I branched it to experiment <a href=\"https://github.com/vasturiano/3d-force-graph\">D3 forced graph with ThreeJS</a>. Still in progress.</p>",
      "design": "Inspired by WestWorld UI graphic and their \"character response scenario\", I wanted to reproduce the navigation flow, with columns and left-to-right paths. However, usability was better with non-oriented flow.",
      "slug": "datavis",
      "images": ["homepage",{url:"loading",caption:"Loading screen - while the solver is building up the graph (which counts 450+ elements so far)"}],
      "link": "",
      "category": "Personal project",
      "cat": "personal",
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
        "list": ["d3", "Vue"],
        "position": {x: 580, y: 1, z: -400}
      }

    }, {
      "id": 5,
      "name": "Takacorp Studio",
      "major": true,
      "summary": "E-commerce website for manga products",
      "year": 2018,
      "description": "<p>Takacorp is a e-commerce website that sell high quality manga figurines. For this website, I realized all the design and all the development (full-stack).</p><p>Let’s face it: payment was a big challenge, on the ground that the website accepts 3 different types of payment (Stripe, Monetico and Paypal), with one-go and staggered payments for 2, 3, 4 and 10 months. Moreover, the website is also SCA compliant - the new European payment regulation. I learnt a lot about Stripe API, webhooks, routing, banking regulations and such.</p><h4>Motivations</h4><ul><li>Full stack, from design, to frontend and backend</li><li>Payment integration</li></ul>",
      "design": "<p>There were two parts:<br>First I drew up a document that exposes the design intentions and principles.</p><p>Over a second phase, I realized the detailed design guideline document that contain the mockups of all the pages. It implies the design of all the individual components, plus the color and font system.</p><p>Regarding the guideline, I defined 2 main directions: staging the products and \"a website made by fans for fans\".<br> Manga is a visual medium; it's all about animation, storytelling and rhythm. The website had to use the same codes. The focus was to stage the products, through layout, animations and visuals.</p>",
      "code": "<p>I chose Ruby on Rails for its robustness and as a reliable backend framework; it offers many built-in tools for security, assets management, routing, back office and optimisations.</p><h4>DevOps</h4><p>Takacorp is hosted on Heroku – a serverless solution easy to manage, to scale and affordable for starting businesses.<br>AWS is used for storage (S3) and MailGun for transactional emails. And source code is maintained with git on an independent repository.</p>",
      "link": "https://takacorp.herokuapp.com",
      "images": ["Taka_webdesign_homepage",{url:"intention", caption:"I started with a design intend, to lead the design elements"}, {url:"Taka_webdesign",caption:"I started with a \"Design Principle\"  document, and then turned it into a proper webdesign guideline"}, {url:"UI_page",caption:"UI components of the pages"}, {url:"stripeCheckout",caption:"Stripe Chaeckout - the website used 3 different payment gateway (Monetico, Paypal and Stripe), accepting one-go and staggered payments"}],
      "slug": "taka",
      "category": "Freelance job - Full stack + design",
      "cat": "freelance",
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
        "position": {x: -250, y: 1, z: -550}
      },
      "techno": {
        "n/a": false,
        "list": ["ruby", "js","heroku", "mailgun", "aws"],
        "position": {x: 1300, y: 1, z: 280}
      }
    }, {
      "id": 6,
      "name": "Uptime checker",
      "major": false,
      "summary": "Internal tool to track uptime website and domain names",
      "description": "<p>Uptime Checker is an internal tool (for BLISS interactive where I worked) to monitor and get notified if one of the website we were managing was down.</p>",
      "year": 2019,
      "code": "I was familiar with Vue already, so I opted for this techno on the ground that it's mainly list rendering (and filtering).</p><p>Backend (Flask) was limited, and only required simple routing and API-like responses (AJAX callls) with SQlite queries returned as JSON.</p><p>For the uptime tool itsellf, it's all written in Python3, fetching all the website and running regular expression to ensure the website is up - set on a CRON job running every 15min.</p><h4>Coding motivations</h4><ul><li>Learning Python scripts</li><li>Experimenting a micro framework (Flask)</li><li>Reactive app and xhr calls</li></ul>",
      "link": "",
      "slug": "uptime",
      "images": ["screenshot", "popup", {url:"flow",caption:"Flow of the webapp - to have a clear overview before starting development"}],
      "category": "Work for BLISS interactive - internal tool",
      "cat": "main",
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
        "list": ["Python", "Flask", "Vue", "mailgun"],
        "position": {x: 70, y: 1, z: -140}
      }
    }, {
      "id": 7,
      "name": "Geography studies",
      "major": false,
      "year": 2009,
      "summary": "Degree in Geography",
      "description": "I studied Geography for 4 years, between Paris 4 - la Sorbonne and UQAM (Montrea, Canada), specilizing in cuture, politic and heritage.",
      "cat": "main",
      "slug": "master",
      "images": [{url:"sorbonne",caption:"Paris Sorbonne, France"},{url:"uqam",caption:"UQAM, Montral, Canada"}],
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
      "year": 2013,
      "summary": "Master degree in Entrepreneuship and Design",
      "description": "After 4 years in geography, I move to Lyon to make a Master degree in Entrepreneuship and Design, between EMLyon and Centrale Lyon. The program was hinged on on social science, ingineering (including coding), business and design. And a fabLab was the pivot point of this studdy, where we were able to prototype ideas and projects.",
      "cat": "main",
      "slug": "master",
      "images": [{url:"emlyon",caption:"EMLYON Business School, France"},{url:"essay-cover",caption:"My final essay, about the impact of innovation of branding"}, {url:"essay-sample", caption:"Sample of my essay"}],
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
      "name": "CAPSA Container - Internship",
      "summary": "Intership",
      "category": "Intership",
      "cat": "main",
      "year": 2014,
      "description": "<p>My main objective was to design and realize a prototype of an accomodation in a maritim container.</p><p>Coming along the master degree, I wrote an essay about how innovation impacts companies' identity.</p>",
      "design": "<p>I mostly work on Capsul, the container's accomodation. It started with exploration and concepts. And then it switched to prototyping the ideas and modeling. I allso worked a lot on the regulations related to hosting.</p><p><a href='https://skfb.ly/F8Wr'>3D model of the room</a> (link to SketchFab)</p><p>In paralel, I helpled with the leaflets, some presentations and 3d modeling for client proposals.</p>",
      "slug": "capsa",
      "images": [{url:"capsul",caption:"My main mission was to design a temporary acomodation in a maritim container. Here is the 3d modeling I made for it (with Blender Cycle)."},{url:"capsul-room",caption:"Detail of the room - we specificaly had to work on adaptable furniture regarding the dimension of a container"},{url:"typo-ctn-01",caption:"Graphic researches with Illustrator about container typology and layout"},{url:"exterieur",caption:"I also worked on other 3d modeling for client requests"},{url:"CAPSA_catalogue_Event-cover",caption:"Event catalog cover"},{url:"catalog-indus-double-page",caption:"Catalog Industry - I designed their 2 catalogs with InDesign - Event and Industry"},{url:"essay-cover",caption:"My Master degree essay - how innovation impacts comapnies' identity"}],
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
      "cat": "main",
      "year": 2015,
      "ignore": true,
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
      "ignore": true,
      "year": 2015,
      "name": "freelance",
      "cat": "freelance",
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
      "cat": "freelance",
      "ignore": false,
      "major": false,
      "year": 2015,
      "category": "Freelance contract",
      "summary": "Platform/marketplace to match mentors and learners",
      "description": "MonMentor was my first profesional and freelance contract, where I learnt all the good practices regarding working with other developers - commit, commenting, documentating...",
      "code": "I picked up Ruby on Rails, and started learning by doing. ",
      "group": "work",
      "timeline": {
        "startingYear": 2015,
        "len": .5,
        "thread": "second",
        "type": "duration",
        "onlyTimeline": true,
      },
      "software": {
        "n/a": true,
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
      "cat": "freelance",
      "year": 2015,
      "ignore": true,
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
      "category": "Living place",
      "cat": "main",
      "year": 2016,
      "major": false,
      "summary": "4 years living in Ho Chi Minh City",
      "description": "I lived in Ho Chi Minh, Vietnam, for 4 years, working mostly at BLISS interactive (an IT agency) along with freelance jobs",
      "slug": "vietnam",
      "images": [{url:"panorama",caption:`Photo by Ashim D’Silva on Unsplash`},"map02"],
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
      "cat": "main",
      "year": 2017,
      "category": "Main job for BLISS interactive",
      "summary": "IT agency in Saigon",
      "description": "I worked for almost 4 years at BLISS interactive as project manager and digital producer. Besides that, I worked on improving internal processes and developing tools to make recurrent tasks easier.",
      "code": `<p>BLISS interactive is bound to 2 sister companies, both creative/advertising agencies. Therefore the specifications and requirements were very different from one project to another. Coding wise, I had the opportunity to work on many different technologies and stacks, such as:</p>
      <ul>
      <li>web apps with VueJS, ReactJS and many Vanilla JS</li>
      <li>Google App Script (Google Sheet and Google Slides) with NodeJS</li>
      <li>a script for Photoshop (using JSX)</li><li>native mobile application with React Native</li><li>training a AI model with Python</li><li>an AR app for IOS and Android (with Unity)</li><li>Chrome extensions</li><li>complex image processing with 3D rendering on server side with OpenCV (CV2), potrace, ImageMagick and Blender Python API</li>
      </ul>`,
      "major": true,
      "slug": "bliss",
      "images": [{url:"rate_card",caption:"I worked on a card rate, which can be adapted from a simple Google Sheet - and then generates a PPT presentation using the Google Slide API."},{url:"hanbook_mockup", caption: "To accelerate on boarding for new comers, I designed a handbook with an overview of the company and all the best practices. Made with InDesign"}, {url:"iso",caption:"This isometric map was the illustration of our office for the BLISS Handbook. Made with Illustrator"},{url:"pepsi-posposal",caption:"One technical propsal I designed for a client"}],
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
        "list": ["JS", "React", "nodejs", "Chrome", "Webpack", "google-cloud", "unity"],
        "position": {x: 1, y: 1, z: 1}
      }
    }, {
      "id": 16,
      "name": "Year of Engineering",
      "cat": "main",
      "summary": "Website for the UK government",
      "description": "Year of Engineering was a UK government initiative, to promote and celebrate engineering. I coworked on the techical approach, as account manager with the British client and as lead deveoper on some phases (only frontend). We worked in collaboration with a design studio based in London.",
      "major": true,
      "year": 2018,
      "category": "Main job for BLISS interactive - development, digital producer and project management",
      "code": "While I didn't set up and work on the first phases, I handle many change requests. I advised the client on technical options, by drawing up scopes along wireframes and diagrams. Then I implemented some of them, and ran quality controls.",
      "slug": "yoe",
      "images": [{url:"techno_approch",caption:"Diagram to describe the technical stack to the client"}, {url:"YoE-AAcompliancy",caption:"As part of the initial scope, I drew up the specs and documentation of the WCAG compliancy (Accessibility)"}, {url:"openbadges",caption:"Sitemap & wireframe for a change request - integrating a new Badge. Made with Illustrator"}],
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
        "position": {x: -480, y: 1, z: 400}
      },
      "techno": {
        "n/a": false,
        "list": ["JS", "React", "aws", "analytics"],
        "position": {x: 0, y: 1, z: 30}
      }
    }, {
      "id": 17,
      "name": "CCM",
      "cat": "main",
      "year": 2019,
      "category":"Project management for BLISS interactive",
      "major": false,
      "summary": "Internal tool to manage creative process",
      "description": "<p>This is another internal tool, developed to manage creative process. I worked as Project Manager on this job, and as secondary developer - for minor tasks and adapting feedback.</p><p>I also wrote all the documentation to facilitate team's onboarding - and to keep track of the changes. I used to <span class=\"abbr\" title=\"Facebook's documentation library, based on React\">Docusaurus</span> to handle the documentation.</p>",
      "slug": "ccm",
      "images": [{url:"flow-overall",caption:"roles and permission diagram"}, "CCM_flow"],
      "group": "work",
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
        "position": {x: -490, y: 200, z: 120}
      },
      "techno": {
        "n/a": false,
        "list": ["JS", "React"],
        "position": {x: 485, y: 1, z: 420}
      }
    }, {
      "id": 18,
      "name": "Identity and branding for BLISS",
      "major": true,
      "cat": "main",
      "year": 2019,
      "category":"Main work for BLISS interactive",
      "slug": "bliss",
      "description": `<p>I worked for 4 years for BLISS interactive.</p>
      <p>Along with regular jobs for clients, I worked at developing the company, with internal tools, improving processes and developing the brand.</p>
      <p>To name a few:</p>
      <ul>
      <li>I made few print layouts (leaflet and handbook)</li>
      <li>Many sorts of scripts to improve productivity (including the Uptime checker)</li>
      <li>Internal tools (webpage, Chrome extensions, Google App scripts...)</li>
      <li>Motion design - <a href="https://vimeo.com/379205001" class="color-link">Link to Vimeo</a></li>
      <li>And I started a 3D animation (a video motion of sort) to showcase BLISS capabilities.</li>
      </ul>`,
      "images": [{url:"rate_card",caption:"I worked o a card rate, which can be adapted from a simple Google Sheet - which then generates a PPT presentation using the Google API."},{url:"hanbook_mockup", caption: "To accelerate on boarding for new comers, I designed a handbook with an overview of the company and all the best practices. Made with InDesign."},{url:"handbook_sample",caption:"The company's handbook sample"}, {url:"iso",caption:"This isometric map was the illustration of our office for the BLISS Handbook, designed with Illustrator"}, {url:"presentation-leaflet", caption:"I also made the company's presentation leaflet"},{url:"motion-project",caption:"I made a motion design to highlight important moments for BLISS in 2019 as a promotional video. Made with After Effects"}],
      "summary": "Developping company brand and culture",
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
        "list": ["photoshop", "illustrator", "indesign", "after-effects", "blender"],
        "position": {x: 430, y: 300, z: -60}
      },
      "techno": {
        "n/a": false,
        "list": ["JS", "React", "nodejs", "Chrome", "Webpack", "google-cloud", "bash"],
        "position": {x: -50, y: 1, z: 330}
      }
    }, {
      "id": 19,
      "name": "Chrome Extension",
      "cat": "main",
      "major": false,
      "category": "Main work for BLISS interactive - lead developer",
      "summary": "Enhance an existing website",
      "description": "I built up a Chrome Extension to enhance an internal tool used for booking, time and tracking management. The extension intended to overcome some missing features, such as the ability to color and filter bookings based upon defined Tags and Phases.",
      "code": "Fully written in Javascript with no dependencies, the challenge was to overcome the behavior dictated by the original website librairies (Preact) - and find work around to pass by these limitations. And performance was also a big concern, since the initial website was already extensively using javascript for interactions.",
      "slug": "extension",
      "images": ["extension", {url:"overlay",caption:"added elements on top ofthe initial website"}],
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
      "cat": "main",
      "major": true,
      "summary": "Website revamping for the largest care provider in Vietnam",
      "description": "<p>FMP is a Vietnamese health provider. I work on revamping their website, both project management and coding.</p><p>The main challenge for this website was to turn their business needs (branding, SEO, practical infos and services from many medical centers in different cities, multiple languages, testimonials...) into a digital solution.</p>",
      "code": "<p>Powered by React and NextJS (and Wagtail for the CMS), the new website intended to be reactive and dynamic. While I din't work on the set up, I developed a large part of the website and handled most of the change requests.</p><p>To name few challenges: a very compex and nested sitemap (see image on the side), external systems that plugged into this new website, many conten pages, a large system of locations (cities and medical centers) over Vietnam with specific content for each - and a in 4 different languages</p>",
      "design": "I design only few elements of the website. However, I built a large part of the website structure, coming up with sitemap, wireframes and flows.",
      "slug": "fmp",
      "images": ["homepage", {url:"FMP_sitemap",caption:"Sitemap of the new website"},{url:"routing-history_page", caption: "I worked on many documents to explain clearly what we were going to build for the client - here is the routing strategy"}, {url:"supplierAPI-flow",caption:"We worked with some suppliers, and I documented to faciitate the integration"}, {url:"doctor_booking", caption:"UX proposal for booking, with filters by medical center and API calls."}, {url:"flow-book_doctor",caption:"For each change requests, I made some wireframes and mockups to help the design department"}, {url:"wireframes_calling_button",caption:"Detailed flow of th calling button feature"}, "fmp-photoshop"],
      "group": "work",
      "category": "Main work for BLISS interactive - Digital producer and lead developer",
      "year": 2019,
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
        "position": {x: 200, y: 1, z: 180}
      },
      "techno": {
        "n/a": false,
        "list": ["js", "React"],
        "position": {x: 650, y: 1, z: 330}
      }
    }, {
      "id": 21,
      "name": "Portfolio",
      "cat": "personal",
      "major": false,
      "summary": "About this website",
      "objectives": "ThreeJS, Webpack, performance oriented",
      "year": 2019,
      "description": "<p>This is my current portfolio (what you are looking at right now), with the intend to showcase my latest design and coding work, plus how these 2 capabilities support my daily work as project manager.</p><p>The source code is available on my <a class=\"color-link\" href=\"https://github.com/ben-richwood/portfolio2020/\">GitHub</a>.</p><h4>Motivations</h4><p>ThreeJS & WebGL, showcase my work and high performance website</p>",
      "code": `<p>This website rests on ThreeJS for the 3d space (actually using CSS3DRenderer, not Primitive objects) and VueJS.</p>
      <p>For the animations, TweenMax (GSAP) takes care of translating elments when changing the filters. And lots of CSS3 animations to keep it lightweight.</p><h4>Performance oriented</h4><p>Since my website is heavy and requires many JS librairies, I spent lot of time optimizing in order to reduce download time and latency. During my tests, it was hitting 60 frames per seconds.</p><p>I used <a href=\"https://css-tricks.com/svg-symbol-good-choice-icons/\">SVGstore</a> to concat all SVG as one big file (≈34 SVG for 71KB), allowing then to display them with &lt;symbol&gt; elements and reducing dozens of HTTP requests</p><p>Webpack is used resolve <code>import</code> and <code>requires</code>, plus to minify and \"Tree shaking\" (for dead-code elimination).</p><p>I set up an image pipeline with Gulp to convert images to JP2000 and Webp (next-gen compression formats), and serving different sizes depending on user's screen size.</p>
      <p>Lazy-loading for images - they load only when opening a project</p>
      <p>JS critical path: the main JS scripts are bundled; but there's also a smaller script directly embedded in the HTML file for animating small parts while the main script is still loading.</p>
      <p>CSS critical path to display relevant and readable content as soon as the first bits load - without waiting for all the assets to load.</p><p>Performance Audit: I ran many performance tests, with the Chrome DevTool (CSS and JS Coverage), <a href=\"https://developers.google.com/web/tools/lighthouse/\">Lighthouse</a>, <a href=\"https://github.com/mrdoob/stats.js/\">Stat.js</a> and many other tools.</p>
      <p>Caching (Cache control and gzip compression) to reduce new reloads.</p>`,
      "design": "<p>I wanted my portfolio as a video games; so I naturally takes many elements from screen graphics and video games UI. I detail more these elements in the option menu (CREDIT tab).</p>",
      "images": [{url:"performance",caption:"Intensive work to ensure it runs as smooth as possible, examinating any potential memory leaks or unused functions"},{url:"room",caption:"My first prototype was a 3D scene, with a metaphor of a two side of a screen: for frontend/design and backend"}, "blender_scene", {url:"blender_screen", caption:"Screenshot of the Blender scene"}],
      "slug": "portfolio",
      "category": "Personal project",
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
        "position": {x: 380, y: 1, z: 490}
      },
      "techno": {
        "n/a": false,
        "list": ["JS", "vue", "webpack", "three", "greensock", "Gulp"],
        "position": {x: 900, y: 1, z: 200}
      }
    }, {
      "id": 22,
      "name": "Tran Duong",
      "cat": "freelance",
      "major": false,
      "summary": "Webdesign for a Vietnamese supplier",
      "description": "I realized the webdesign for a Vietnamese supplier and constructer of high-class wallpaper and curtains.",
      "slug": "td",
      "images": ["products-page", {url:"TD-photoshop",caption:"Photoshop file"}],
      "objectives": null,
      "year": 2020,
      "design": "The main goal was to showcase the product and give a high-end impression of the company. I got inspirations from hotels and luxury resort, and design the website with Photoshop.",
      "link": "https://tranduongco.vn/",
      "category": "Freelance contract - Webdesign",
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
        "position": {x: 780, y: 1, z: 600}
      },
      "techno": {
        "n/a": true,
        "list": [],
        "position": {x: 630, y: 1, z: 450}
      }
    }, {
      "id": 23,
      "name": "Minh Minh Nhut",
      "cat": "freelance",
      "major": false,
      "summary": "Webdesign for a packaging company",
      "description": "Minh Minh Nhut supplies, manufactures paper bags/boxes and label tags industry. I redesigned their website.",
      "design": "I took inspiration from the print industry: bleeds and print mark, paper texture and Material Design (from Google) for the metaphor of texture.",
      "objectives": null,
      "year": 2020,
      "design": "I took inspiration from the print industry: bleeds and print mark, paper texture and Material Design (from Google) for the metaphor of texture. And I put emphasis on their production process and machines.",
      "link": "https://minhminhnhut.com/",
      "slug": "mmi",
      "images": ["products-page", "about-us", {url:"MMI_ps",caption:"Photoshop file"},{url:"footer_detail",caption:"Footer detail - inspiration from print industry and standards"}],
      "category": "Freelance contract - Webdesign",
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
        "position": {x: 1200, y: 1, z: 500}
      },
      "techno": {
        "n/a": true,
        "list": [],
        "position": {x: 900, y: 1, z: 200}
      }
    }, {
      "id": 24,
      "name": "Spotify Campaign",
      "cat": "main",
      "major": true,
      "summary": "Campaign website for Spotify Vietnam",
      "description": `<p>For one of their campaign, I was in charge of developing the website for <b>Spotify</b> (both backend and frontend).</p><h4>Motivations and challenges</h4>
      <ul><li>Trying parcel</li><li>multiple locales with Vue</li> <li>secured backend with Flask (CSRF token, CORS)</li><li>Vision AI</li></ul>`,
      "year": 2020,
      "code": "It's a one-page app, built with VueJS. It handles photo uploads, using Google Cloud Vision AI to detect explicit and/or violent content in the pictures. And it's all build in a secure Google App Engine",
      "link": "https://spotify-fan.com/",
      "images": ["home", {url:"artist", caption:"The website showcases some local artists"}],
      "slug": "spotify",
      "category": "Main job for BLISS interactive - Web development and project management",
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
        "list": ["Python", "Flask", "Vue", "Parcel", "google-cloud"],
        "position": {x: 160, y: 1, z: -400}
      }
    }, {
      "id": 25,
      "name": "Hideout",
      "summary": "3d modeling",
      "year": 2020,
      "major": false,
      "description": "<p>I'm starting a collection named \"Hideout\". The idea is to model and render places that focus on a specific ambiance or mood.</p><p>Here, the keywords were warm, \"cosy\", \"elegant\" and \"industrial\".</p>",
      // "code": "The website is based on Wordpress, to allow the client to easily edit content (tours and activities).",
      "design": `<p>All the images have been rendered with Cycles - while I mainly used EEVEE during the process. I also used the NVIDIA denoiser.</p><h4>Motivations and challenges</h4>
      <ul><li>Photorealism-like</li>
      <li>Focus on lighting and create an specific ambiance with lights</li>
      <li>Using EEVEE and Cycles</li>
      <li>Experimenting IES lights</li>
      <li><a href=\"https://www.chippwalters.com/products/nitrox-3d\"></a>NITROX 3D workflow</a> - thanks to Chipp Walter</li>
      </ul>`,
      "link": "https://www.behance.net/gallery/113021679/Hideout-1",
      "slug": "hideout",
      "images": ["main", "wall", "stairs", {url: "blender-screenshot", caption:"Screenshot of the Blender file"}],
      "category": "Personal project - 3D modeling, lighting, texturing and rendering",
      "cat": "personal",
      "group": "freelance",
      "timeline": {
        "n/a": false,
        "onlyTimeline": false,
        "startingYear": 2020.8,
        "len": .3,
        "thread": "second",
        "type": "duration",
      },
      "software": {
        "n/a": false,
        "list": ["blender"],
        "position": {x: 1600, y: 100, z: -100}
      },
      "techno": {
        "n/a": true,
        // "list": ["PHP", "Wordpress", "Bootstrap"],
        // "position": {x: 190, y: 200, z: -780}
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
        "position": {x: 600, y: 200, z: -640},
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
        "position": {x: -800, y: 200, z: 0},
        "icon": "sketch"
      }, {
        "name": "InDesign",
        "position": {x: 700, y: 1, z: -760},
        "icon": "indesign"
      }, {
        "name": "Photoshop",
        "position": {x: 900, y: 1, z: 280},
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
