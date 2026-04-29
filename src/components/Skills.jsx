import React, { useState } from 'react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  
  const skillCategories = {
    "Frontend": ["React Js", "Next.js", "Nuxt Js", "Tailwind CSS", "TypeScript", "Redux","Java Script"],
    "Backend": ["Node Js", "Java", "Prisma ORM", "Express Js", "GraphQL"],
    "Database": ["My SQL", "PostgreSQL", "MongoDB"],
    "UI Libraries": ["Tailwindcss", "Daisyui", "Ant Design", "Material UI"],
    "Mobile": ["React Native","My SQL", "PostgreSQL", "MongoDB","Node Js", "Java"],
    "Testing": ["Mocha", "Chai"],
    "Hosting": ["Namecheap", "Hostinger", "Firebase"]
  };
  
  // Get skill icons mapping
  const getSkillIcon = (skill) => {
    const iconMap = {
      "React Js": "https://media.licdn.com/dms/image/v2/D4D12AQF1EyeWwTqYRQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1704297354332?e=2147483647&v=beta&t=ZEb56MEQ8i1R9nwGipQ7599SCFnYmDI0ssZabyLZ_bI",
      "Next.js": "https://flatirons.com/static/0a79ca63e3ace4bfd802a70a2d7427ae/537f5/What-is-Drupal-An-Overview-in-2025.webp",
      "TypeScript": "https://images.ctfassets.net/23aumh6u8s0i/1GpPK36EMwOOZZcQPV4YRD/8acc95b8c3639be1be1d445e5e762dae/typescript",
      "Node Js": "https://logowik.com/content/uploads/images/node-js6304.logowik.com.webp",
      "Express Js": "https://ajeetchaulagain.com/static/7cb4af597964b0911fe71cb2f8148d64/87351/express-js.png",
      "Java": "https://minhphanjavahome.wordpress.com/wp-content/uploads/2019/04/java_logo_640.jpg",
      "Ant Design": "https://static-00.iconduck.com/assets.00/ant-design-icon-2048x2046-dl3neb73.png",
      "MongoDB": "https://w7.pngwing.com/pngs/634/68/png-transparent-mongo-db-mongodb-database-document-oriented-nosql-mongodb-logo-3d-icon.png",
      "Nuxt Js":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_U3tzLtxZK5NTXGtyAT0SEVDdN42jqZMos_6MsvhWKvqFlPNNsblj2nPeJ0gYiB48ONA&usqp=CAU",
      "Tailwind CSS":"https://pbs.twimg.com/profile_images/1730334391501488129/G0R0sjHH_400x400.jpg",
      "Redux":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsRlH5x8oBQAqXxQBNwTIGAnoBBrjEWHP2pw&s",
      "Java Script":"https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
      "Prisma ORM":"https://blog.logrocket.com/wp-content/uploads/2024/03/Prisma-adoption-guide-Overview-examples-alternatives.png",
      "GraphQL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0DWOc8XNKmGT1zW1AZu8wMsY_p7wMSGXzO63o50w3dyWe8ZrZi04S0yNHWsfylrX4TFY&usqp=CAU",
      "My SQL":"https://ih1.redbubble.net/image.5536116430.2042/st,small,507x507-pad,600x600,f8f8f8.jpg",
      "PostgreSQL":"https://w7.pngwing.com/pngs/441/460/png-transparent-postgresql-plain-wordmark-logo-icon-thumbnail.png",
      "React Native":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSaDruEVyNREIC5U5kX3nKRgMoxpbGw6VtPA&s",
      "Mocha":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfguoOl1V9f5MOmo298QW-GcSKWHY44HMpsg&s",
      "Chai":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz3lUPoXoLdlC6zxYF5rJxebHBifiEXHBf4w&s",
      "Namecheap":"https://images.seeklogo.com/logo-png/27/2/namecheap-logo-png_seeklogo-273737.png",
      "Hostinger":"https://i.pinimg.com/736x/e5/be/d0/e5bed0ffbd779f3ab22afd026ca383bd.jpg",
      
      "Firebase":"https://firebase.google.com/static/images/brand-guidelines/logo-vertical.png",
      "Tailwindcss":"https://seeklogo.com/images/T/tailwind-css-logo-5AD4175897-seeklogo.com.png",
      "Daisyui":"https://www.figma.com/community/resource/123f4982-02c7-40e4-9453-cebc0302f8f7/thumbnail",
      "Material UI":"https://s3-ap-south-1.amazonaws.com/trt-blog-ghost/2023/01/MATERIAL-UI.png",

      // Default icon for skills without specific images
      "default": "https://img.freepik.com/premium-vector/professional-skills-vector-icon-isolated-white-background_775815-968.jpg"
    };
    
    return iconMap[skill] || iconMap["default"];
  };

  return (
    <div name="skills" className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-800 overflow-hidden text-white">
      <div className="max-w-screen-xl p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8 mt-16">
          <p className="text-5xl font-bold inline border-b-4 border-pink-500">
            My Skills
          </p>
          <p className="py-6 text-lg text-gray-300">Check out my professional toolkit and expertise</p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.keys(skillCategories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? "bg-pink-600 text-white shadow-lg"
                  : "bg-indigo-800/50 text-gray-300 hover:bg-indigo-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skillCategories[activeCategory].map((skill) => (
            <div key={skill} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 hover:bg-gray-700/60 transition-all duration-300 shadow-lg hover:shadow-pink-600/20 group transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center p-1">
                  <img 
                    src={getSkillIcon(skill)} 
                    alt={skill}
                    className="object-contain rounded-md group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <span className="text-lg font-medium group-hover:text-pink-400 transition-colors duration-300">{skill}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Animated Skills Circle */}
        <div className="flex justify-center items-center mt-20 mb-12">
          <div className="partners-intro--thumb w-64 h-64 md:w-96 md:h-96 relative">
            <div className="partners-intro--partners">
              {/* Dynamically render the circle items based on active category */}
              {skillCategories[activeCategory].slice(0, 8).map((skill, index) => (
                <div key={skill} className={`partners-intro--partners-item -pos-${index + 1}`}>
                  <img 
                    className="lazy loaded rounded-full w-10 h-10 md:w-14 md:h-14 object-cover" 
                    alt={skill}
                    src={getSkillIcon(skill)} 
                  />
                </div>
              ))}
            </div>
            <div className="partners-intro--logo">
              <img 
                className="lazy loaded rounded-full"
                alt="Skills" 
                src="https://img.freepik.com/premium-vector/professional-skills-vector-icon-isolated-white-background_775815-968.jpg" 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for animation */}
      <style jsx>{`
        .partners-intro--thumb {
          position: relative;
        }
        
        .partners-intro--partners {
          width: 100%;
          height: 100%;
          animation: partnersRotating 30s linear infinite;
        }
        
        .partners-intro--logo {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width: 80px;
          height: 80px;
          background: #fff;
          box-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .partners-intro--logo img {
          display: block;
          width: 65px;
        }
        
        .partners-intro--partners-item {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 0 15px rgba(236, 72, 153, 0.2);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .partners-intro--partners-item.-pos-1 {
          transform: translate(0, -217%);
        }
        
        .partners-intro--partners-item.-pos-2 {
          transform: translate(164%, -153%);
        }
        
        .partners-intro--partners-item.-pos-3 {
          transform: translate(220%, 3%);
        }
        
        .partners-intro--partners-item.-pos-4 {
          transform: translate(164%, 159%);
        }
        
        .partners-intro--partners-item.-pos-5 {
          transform: translate(0, 225%);
        }
        
        .partners-intro--partners-item.-pos-6 {
          transform: translate(-157%, 163%);
        }
        
        .partners-intro--partners-item.-pos-7 {
          transform: translate(-209%, 3%);
        }
        
        .partners-intro--partners-item.-pos-8 {
          transform: translate(-157%, -151%);
        }
        
        .partners-intro--partners-item img {
          display: block;
          animation: partnersIconsRotating 30s linear infinite;
        }
        
        @keyframes partnersRotating {
          from {
            transform: rotate(0);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        
        @keyframes partnersIconsRotating {
          from {
            transform: rotate(0);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Skills;