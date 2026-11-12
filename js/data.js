/* =====================================================================
   YOUR CONTENT — edit this file to change what the site says.
   You never need to touch index.html, style.css or main.js for content.

   IMAGES: put picture files in the  images/  folder and write the path,
   for example  photo: "images/me.jpg"  or  image: "images/sentiment.png".
   Leave a field as "" to use the built-in placeholder.

   LOGOS: dev("python/python-original") loads a coloured logo from Devicon
   (https://devicon.dev), si("polars") loads a one-colour logo from
   Simple Icons (https://simpleicons.org). You can also use your own file,
   e.g.  logo: "images/powerbi.svg".
   ===================================================================== */

const dev = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${path}.svg`;
const si = (slug) => `https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/${slug}.svg`;

window.PROFILE = {
  name: "Muhammad Safwan bin Mohd Azmi",
  short: "Muhammad Safwan",
  initials: "MS",
  brand: "safwan",                       // shows as "safwan.dev" in the menu

  /* Lanyard badge. Portrait (tall) photos look best, e.g. 600 x 800. */
  photo: "images/me.jpg",
  photoFocus: "50% 30%",                 // which part of the photo to keep centred (x% y%)
  badge: {
    company: "SAFWAN.DEV",               // printed on the badge header and the strap
    label: "Staff",                      // top-right corner of the badge
    title: "",                           // optional job title under your name; leave "" for none
    id: "0486"                           // ID number printed under the barcode
  },
  role: "Aspiring Data Engineer",
  availability: "Available for work",

  /* Intro screen words (shown once per visit). */
  greetings: ["Welcome", "Selamat datang", "مرحباً"],

  typed: ["Cloud & Big Data", "Building ETL pipelines", "Python · SQL · Spark · Kafka", "AWS Certified Cloud Practitioner"],
  lead: "Computer Science (Data Engineering) graduate who builds cloud ETL pipelines, real-time streaming systems and dashboards, with industry experience in the financial services sector.",
  heroChips: ["Python", "Apache Spark", "Kafka", "AWS", "Airflow"],

  bio: [
    "I'm a Computer Science graduate from Universiti Teknologi Malaysia, specialising in Data Engineering. I've processed datasets of more than 22 million records and built pipelines with Python, SQL, Apache Spark, Kafka and AWS.",
    "At Agrobank I built a FinOps ETL pipeline to track cloud spending, ran cloud readiness and risk assessments, and supported cloud governance work aligned with Bank Negara Malaysia's RMiT guidelines.",
    "I'm an AWS Certified Cloud Practitioner and FinOps Certified Practitioner, and I'm looking to bring cloud and data engineering skills to a leading telecommunications organisation."
  ],
  quote: "Turning raw data into pipelines that are scalable, efficient and easy to trust.",
  languages: ["Bahasa Melayu · Native", "English · Professional", "Arabic · Elementary"],
  cv: "Safwan_Resume.pdf",
  email: "safwanazmi486@gmail.com",
  location: "Malaysia",

  stats: [
    { value: 22, suffix: "M+", label: "Records processed in one benchmark" },
    { value: 6, suffix: "", label: "Projects built" },
    { value: 12, suffix: "", label: "Certifications" },
    { value: 3.78, suffix: "", decimals: 2, label: "CGPA at UTM, Dean's List" }
  ],

  experience: [
    { when: "Sep 2025 – Jul 2026", org: "Bank Pertanian Malaysia Berhad (Agrobank)", what: "Industrial Attachment · Cloud & Data", tag: "Internship",
      logo: "",                          // small round logo, e.g. "images/agrobank.png"
      images: [],                        // photos, e.g. ["images/agrobank-1.jpg", "images/agrobank-2.jpg"]
      points: [
        "Built a FinOps ETL pipeline to monitor cloud spending and guide cost optimisation",
        "Ran cloud readiness and risk assessments for financial services workloads",
        "Built a SharePoint + Power BI dashboard tracking 20+ projects",
        "Supported IESP cloud submissions to Bank Negara Malaysia and RMiT governance gap analysis"
      ] },
    { when: "Feb 2025 – Aug 2025", org: "Program Akar · AWS re/Start (PayNet)", what: "Cloud trainee", tag: "Training",
      logo: "",
      images: ["images/aws-restart.jpg"],
      points: [
        "Hands-on training in EC2, S3, IAM, Lambda, system operations and cloud security",
        "Applied cloud fundamentals to real projects, including digital payment systems"
      ] }
  ],

  education: [
    { when: "Universiti Teknologi Malaysia", org: "B.Sc. Computer Science (Data Engineering) with Honours", what: "Skudai, Johor Bahru", tag: "CGPA 3.78 · Dean's List", logo: "", images: [] },
    { when: "Universiti Teknologi MARA", org: "Foundation in Engineering", what: "Dengkil, Selangor", tag: "CGPA 4.00 · MUET Band 4", logo: "", images: [] },
    { when: "Tuanku Jaafar Technical Institute", org: "SPM, Electrical & Electronic Engineering", what: "", tag: "SPM", logo: "", images: [] }
  ],

  activities: [
    { when: "Dec 2024", org: "CyberX CTF 2024 · UTM team", what: "Web exploitation, cryptography, forensics, reverse engineering", tag: "Competition", logo: "", images: [] },
    { when: "Feb 2024", org: "Service-Learning Futsal Program", what: "Coach & organiser with Kolej Matrikulasi Johor", tag: "Volunteer", logo: "", images: [] },
    { when: "Dec 2023", org: "Opera 23", what: "Main committee: registration & merit allocation", tag: "Committee", logo: "", images: [] }
  ],

  /* The FIRST project is shown large as the featured project.
     image: a screenshot (16:9 works best), e.g. "images/sentiment.png" */
  projects: [
    { title: "Real-Time Sentiment Analysis System", date: "Oct 2025", image: "",
      metric: "87%", metricLabel: "classifier accuracy",
      flow: ["YouTube", "Kafka", "Spark", "Elastic", "Kibana"], stack: ["Kafka", "Spark", "Elasticsearch", "Docker"],
      desc: "Streaming pipeline that scores YouTube comments as they arrive and charts sentiment live.",
      points: ["Built a real-time pipeline with Apache Kafka, Spark, Elasticsearch and Kibana", "Trained a TF-IDF + Logistic Regression sentiment classifier reaching 87% accuracy", "Containerised with Docker and visualised sentiment trends in real time"],
      live: "", code: "https://github.com/safwan0486" },
    { title: "High-Performance Web Crawler", date: "Oct 2025", image: "",
      metric: "100K+", metricLabel: "records collected",
      flow: ["Scrapy", "Selenium", "PySpark", "MongoDB"], stack: ["Scrapy", "Selenium", "Dask", "MongoDB Atlas"],
      desc: "Large-scale crawler that collected over 100,000 records and processed them in parallel.",
      points: ["Built a crawler with Selenium, BeautifulSoup and Scrapy that collected 100,000+ records", "Processed the data with PySpark and Dask", "Stored results in MongoDB Atlas"],
      live: "", code: "https://github.com/safwan0486" },
    { title: "Big Data Processing & Benchmarking", date: "Aug 2025", image: "",
      metric: "22M+", metricLabel: "rows · 2.41 GB",
      flow: ["Pandas", "vs", "Dask", "vs", "Polars"], stack: ["Polars", "Dask", "Pandas"],
      desc: "Benchmarked Pandas, Dask and Polars on a 2.41 GB dataset to find the fastest, leanest option.",
      points: ["Processed a 2.41 GB dataset with 22M+ records to test optimisation techniques", "Benchmarked Pandas, Dask and Polars on speed and memory", "Found Polars fastest with the lowest memory usage"],
      live: "", code: "https://github.com/safwan0486" },
    { title: "Smart Eco Vision System", date: "Feb 2024", image: "",
      metric: "AI + IoT", metricLabel: "plant health monitoring",
      flow: ["Sensors", "Camera", "ML model", "Alerts"], stack: ["Machine Learning", "IoT", "Computer Vision"],
      desc: "AI-based agricultural monitoring that checks plant health from images and soil sensors.",
      points: ["Built an AI-powered system for plant health assessment using ML and IoT sensors", "Added image recognition to detect plant abnormalities", "Monitored soil conditions in real time"],
      live: "", code: "" },
    { title: "Exita Inventory & Procurement System", date: "Mar 2025", image: "",
      metric: "SAP ERP", metricLabel: "manufacturing",
      flow: ["Purchase", "Inventory", "Reports"], stack: ["SAP ERP"],
      desc: "Inventory and procurement workflows for a manufacturing company, built on SAP ERP.",
      points: ["Designed inventory and procurement processes for Exita Manufacturing on SAP ERP"],
      live: "", code: "" },
    { title: "AKMaju Management System", date: "Jan 2024", image: "",
      metric: "Web app", metricLabel: "construction & ads",
      flow: ["Projects", "Clients", "Billing"], stack: ["PHP", "MySQL"],
      desc: "Management system for a construction and advertising business.",
      points: ["Built a management system for AKMaju's construction and advertisement operations"],
      live: "", code: "" }
  ],

  /* image: a picture of the certificate; link: the credential URL (Credly etc.) */
  certificates: [
    { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", logo: dev("amazonwebservices/amazonwebservices-plain-wordmark"), image: "", link: "" },
    { title: "FinOps Certified Practitioner", issuer: "FinOps Foundation", logo: "", image: "", link: "" },
    { title: "AWS re/Start Graduate", issuer: "Amazon Web Services", logo: dev("amazonwebservices/amazonwebservices-plain-wordmark"), image: "", link: "" },
    { title: "AWS Academy Cloud Foundations", issuer: "AWS Academy", logo: dev("amazonwebservices/amazonwebservices-plain-wordmark"), image: "", link: "" },
    { title: "AWS Academy Cloud Developing", issuer: "AWS Academy", logo: dev("amazonwebservices/amazonwebservices-plain-wordmark"), image: "", link: "" },
    { title: "AWS Academy Cloud Data Pipeline Builder", issuer: "AWS Academy", logo: dev("amazonwebservices/amazonwebservices-plain-wordmark"), image: "", link: "" },
    { title: "Generative AI Essentials on AWS", issuer: "Amazon Web Services", logo: dev("amazonwebservices/amazonwebservices-plain-wordmark"), image: "", link: "" },
    { title: "Alteryx Designer Core", issuer: "Alteryx", logo: "", image: "", link: "" },
    { title: "Alteryx Foundational Micro-Credential", issuer: "Alteryx", logo: "", image: "", link: "" },
    { title: "ICDL Documents", issuer: "ICDL", logo: "", image: "", link: "" },
    { title: "ICDL Spreadsheets", issuer: "ICDL", logo: "", image: "", link: "" },
    { title: "ICDL Teamwork", issuer: "ICDL", logo: "", image: "", link: "" }
  ],

  /* Tech stack. mono: true means a one-colour logo (it turns white in dark mode). */
  skills: {
    "Programming": [
      { name: "Python", logo: dev("python/python-original") },
      { name: "SQL", logo: dev("sqldeveloper/sqldeveloper-original") },
      { name: "Linux", logo: dev("linux/linux-original") },
      { name: "Java", logo: dev("java/java-original") },
      { name: "C++", logo: dev("cplusplus/cplusplus-original") },
      { name: "PHP", logo: dev("php/php-original") },
      { name: "TypeScript", logo: dev("typescript/typescript-original") },
      { name: "JavaScript", logo: dev("javascript/javascript-original") }
    ],
    "Data engineering & big data": [
      { name: "Apache Spark", logo: dev("apachespark/apachespark-original") },
      { name: "Apache Airflow", logo: dev("apacheairflow/apacheairflow-original") },
      { name: "Apache Kafka", logo: dev("apachekafka/apachekafka-original"), mono: true },
      { name: "Pandas", logo: dev("pandas/pandas-original") },
      { name: "Dask", logo: si("dask"), mono: true },
      { name: "Polars", logo: si("polars"), mono: true }
    ],
    "Cloud & DevOps": [
      { name: "AWS", logo: dev("amazonwebservices/amazonwebservices-plain-wordmark"), mono: true },
      { name: "Azure", logo: dev("azure/azure-original") },
      { name: "Docker", logo: dev("docker/docker-original") },
      { name: "Kubernetes", logo: dev("kubernetes/kubernetes-original") }
    ],
    "Databases & search": [
      { name: "MySQL", logo: dev("mysql/mysql-original") },
      { name: "PostgreSQL", logo: dev("postgresql/postgresql-original") },
      { name: "MongoDB Atlas", logo: dev("mongodb/mongodb-original") },
      { name: "Elasticsearch", logo: dev("elasticsearch/elasticsearch-original") }
    ],
    "Visualisation": [
      { name: "Power BI", logo: "" },
      { name: "Tableau", logo: si("tableau"), mono: true },
      { name: "Kibana", logo: dev("kibana/kibana-original") }
    ],
    "Scraping & tools": [
      { name: "Selenium", logo: dev("selenium/selenium-original") },
      { name: "Scrapy", logo: si("scrapy"), mono: true },
      { name: "BeautifulSoup", logo: "" },
      { name: "Git", logo: dev("git/git-original") },
      { name: "VS Code", logo: dev("vscode/vscode-original") },
      { name: "SAP", logo: si("sap"), mono: true },
      { name: "SharePoint", logo: "" },
      { name: "Figma", logo: dev("figma/figma-original") }
    ]
  },

  socials: [
    { name: "LinkedIn", handle: "in/safwanazmi", url: "https://www.linkedin.com/in/safwanazmi" },
    { name: "GitHub", handle: "@safwan0486", url: "https://github.com/safwan0486" }
  ],

  /* Contact form: create a free form at https://formspree.io and paste its URL here. */
  formEndpoint: ""
};
