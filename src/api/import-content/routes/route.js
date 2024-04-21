module.exports = {
   routes: [
     {
       method: "POST",
       path: "/import/data",
       handler: "import-file.ImportData",
       config: {
         policies: [],
         middlewares: [],
       },
     },
 
   ]
 };
 