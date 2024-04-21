const xlsx = require('xlsx');

module.exports = {
     async ImportData(ctx) {
          try {
            const file = ctx.request.files.file;
            const workbook = xlsx.readFile(file.path);
            const sheetNameList = workbook.SheetNames;
            const usersData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
      
            for (let i = 0; i < usersData.length; i++) {
              const userData = usersData[i];
              
              // Check if userData is empty or incomplete
              if (!userData || Object.values(userData).every(value => value === undefined || value === null || value === '')) {
                console.log("Skipping empty row or incomplete data:", userData);
                continue;
              }
              
              console.log("Creating entry for userData:", userData);
              const fileData = await strapi.query('api::news-pepar.news-pepar').create({
                data: {
                  date: new Date(),
                  peparFile: userData.IMAGEID,
                  title: userData.TITLE,
                  description: userData.META_DESCRIPTION,
                  tag: userData.META_TAG,
                  titleUrl: generateTitleUrl(userData.TITLE)
                }
              });
              console.log("Entry created:", fileData);
              break;
            }
          } catch (error) {
            console.error("Error occurred while importing data:", error);
          }
        }
      };

function generateTitleUrl(title) {
  return title.replace(/\s+/g, '-').toLowerCase();
}
