const puppeteer = require('puppeteer')



async function scrapeTrustPilot(word, searchId, endPoint) {

  var product = []
  try {
      const chrome = await puppeteer.launch({headless: true})
      const page = await chrome.newPage()
      await page.goto(`https://www.trustpilot.com/search?query=${word}&search-button`, {waitUntil: 'load', timeout: 0})

      const urls = await page.evaluate(() => Array.from( 
            document.querySelectorAll('#__next > div > div > main > div > div > ul > li > a'), element => element.href));

      for (let i = 0, total_urls = urls.length; i < total_urls; i++) {
     
        await page.goto(urls[i], {waitUntil: 'load', timeout: 0});        
        
        // Get the data ...
        const body = await page.evaluate((searchId) => {
          var searchId = searchId       
          /* Get product features */
          let users = document.querySelectorAll('#__next > div > div > div > main > div > div.styles_mainContent__nFxAv > section > div > article > aside > div > a > span');
          let reviews = document.querySelectorAll("#__next > div > div > div > main > div > div.styles_mainContent__nFxAv > section > div > article > section > div.styles_reviewContent__0Q2Tg > p.typography_body-l__KUYFJ.typography_appearance-default__AAY17.typography_color-black__5LYEn")
                  
          productList = []
          productObject = {}
      
          for( i=0;i<reviews.length;i++ ){             
            productObject = { 
              "user": users[i].innerHTML,              
              // "date": date,
              "text": reviews[i].innerHTML, 
            }
            productList.push(productObject)
          }; 
          
          fetch(endPoint, {
            method: "POST",
            body: JSON.stringify({"data": productList}),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          })
          .then(res => res.json())
          .then(json => console.log(json))
          .catch(err => console.log(err))          
           
        return productList  

        }, searchId)        
        product.push(...body)
      }      
            
      await chrome.close()
    } catch (error) {
      console.log(error)
    }
    return product
}  


// async function scrapeAmazon(word) {
//     var body;
//     var product = []
//     // var product_ = {"text": product };
//       try {
//           const chrome = await puppeteer.launch({headless: false})
//           const page = await chrome.newPage()
//           await page.goto(`https://www.amazon.com/s?k=${word}`, {waitUntil: 'load', timeout: 0})
          
//           // await new Promise(r => setTimeout(r, 4000));
//           const urls = await page.evaluate(() => 
//                 Array.from(document.querySelectorAll('.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal'), 
//                     element => element.href));
    
//           // console.log("******uuurrrlllsss", urls, "*****")                
//           for (let i = 0, total_urls = 4; i < total_urls; i++) {
//             await page.goto(urls[i], {waitUntil: 'load', timeout: 0});
//             // await new Promise(r => setTimeout(r, 2000));
//             // await new Promise(r => setTimeout(r, 6000));
//             // console.log("###### uuurrrlllsss position", urls[i], "##########")
//             // Get the data ...
//             body = await page.evaluate(() => {
//               // let user = document.body.querySelector('#productTitle').innerText;
//               // let user = document.body.querySelector('#productTitle').innerText;
  
//               /* Get product features */
//               let users = document.querySelectorAll('.a-profile-name');
//               let reviews = document.querySelectorAll("div.a-row.a-spacing-small.review-data > span > div > div.a-expander-content.reviewText.review-text-content.a-expander-partial-collapse-content > span")
//               // let usersList = [];            
//               // let reviewsList = []
              
//               var product = {}
              
//                 for( i=0; i < users.length; i++ ){                 
  
//                   if(users[i].innerHTML != "" && reviews[i].innerHTML != ""){
//                     product = {
//                       "user": users[i].innerHTML,
//                       "reviews": reviews[i].innerHTML,
//                    }  
  
//                   }              
//                 }           
  
//                 fetch(`http://127.0.0.1:8000/search/search/update/448524c7-7b51-49d7-9925-135f3dcbdfbd/`, {
//                   method: "POST",
//                   body: JSON.stringify({"searchId": "448524c7-7b51-49d7-9925-135f3dcbdfbd"}),
//                   headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json'
//                 },
//                 })
//                 .then(res => res.json())
//                 .then(json => console.log(json))
//                 .catch(err => console.log(err))
//                 console.log("doonnnee")
  
//               return product;          
//             })          
            
//             product.push(body)          
                      
//           }              
//           await chrome.close()
          
//         } catch (error) {
//           console.log(error)
//         }    
//         return product;
// }
  
// async function scrapeIMDB(word, searchId) {
// var product = []
// try {
//     const chrome = await puppeteer.launch({headless: true})
//     const page = await chrome.newPage()
//     await page.goto(`https://www.imdb.com/find/?q=${word}&s=tt&exact=true&ref_=fn_tt_ex`, {waitUntil: 'load', timeout: 0})                        

//     const urls = await page.evaluate(() => Array.from( 
//             document.querySelectorAll('ul > li > div.ipc-metadata-list-summary-item__c > div.ipc-metadata-list-summary-item__tc > a'), element => element.href));
//             console.log("#######", urls)

//     for (let i = 0, total_urls = 3; i < total_urls; i++) {

//         var url = urls[i];        
//         var url_parts = url.replace(/\/\s*$/,'').split('/');         
//         url_parts.shift(); 
//         console.log("************", url_parts[3])

//         await page.goto(`https://www.imdb.com/title/${url_parts[3]}/reviews?ref_=tt_urv`, {waitUntil: 'load', timeout: 0});        
        
//         // Get the data ...        
//         const body = await page.evaluate((searchId) => {        
//         var searchId = searchId

//         /* Get product features */
//         let users = document.body.querySelectorAll('#main > section > div.lister > div.lister-list > div > div.review-container > div.lister-item-content > div.display-name-date > span.display-name-link > a');
//         let reviews = document.querySelectorAll("#main > section > div.lister > div.lister-list > div > div.review-container > div.lister-item-content > div.content > div.text.show-more__control")
//         // let usersList = [];            
//         let reviewsList = []
//         productList = []
//         productObject = {}
        
//         // console.log("seaachidd",searchId)
//         // for( i=0;i<users.length;i++ ){ 
//         //   usersList.push(users[i].innerHTML)
//         // }

//         for( i=0;i<reviews.length;i++ ){ 
//             // reviewsList.push(reviews[i].innerHTML)
//             productObject = { 
//             "user": users[i].innerHTML,              
//             // "date": date,
//             "review": reviews[i].innerHTML, 
//             }
//             productList.push(productObject)
//         };    
//         fetch(`http://127.0.0.1:8000/search/search/update/${searchId}/`, {
//             method: "POST",
//             body: JSON.stringify({"searchId": searchId, "data": productList}),
//             headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         })
//         .then(res => res.json())
//         .then(json => console.log(json))
//         .catch(err => console.log(err))
//         console.log("doonnnee") 
            
//         return productList    
//         }, searchId)      


//         product.push(...body)

//     }
            
//     await chrome.close()
//     } catch (error) {
//     console.log(error)
//     }

//     return product;
// }
  

  // async function scrapeTripAdvisor(word, searchId) {
  //   var product;
  //   try {
  //       const chrome = await puppeteer.launch({headless: false})
  //       const page = await chrome.newPage()
  //       await page.goto(`https://www.tripadvisor.com/Search?q=${word}`, {waitUntil: 'load', timeout: 0})                        
  
  //       const urls = await page.evaluate(() => Array.from( 
  //             document.body.querySelectorAll("div.page > div > div.ui_container.main_wrap > div > div > div > div > div.content_column.ui_column.is-9-desktop.is-12-tablet.is-12-mobile > div > div.ui_columns.sections_wrapper > div > div:nth-child(5) > div > div.main_content.ui_column.is-12 > div > div:nth-child(2) > div > div > div > div > div > div > div.ui_column.is-9-desktop.is-8-mobile.is-9-tablet.content-block-column > div.location-meta-block > div.rating-review-count > div > a"), element => element.href));
  
              
  //       for (let i = 0, total_urls = urls.length; i < total_urls; i++) {
  
  //         console.log("#####", urls[i])
  
  //         await page.goto(urls[i], {waitUntil: 'load', timeout: 0});                        
          
  //         // Get the data ...
  //         const body = await page.evaluate((searchId) => {
  //           var searchId = searchId
  //           /* Get product features */          
  //           let users = document.querySelectorAll("#component_16 > div > div > div > div.sCZGP > div > div.cRVSd > span > a")
  //           let reviews = document.querySelectorAll("#component_17 > div > div > div > div.WAllg._T > div.vTVDc > div._T.FKffI.bmUTE > div.fIrGe._T > q > span")
            
  //           productList = []
  //           productObject = {}
        
  //           for( i=0;i<reviews.length;i++ ){             
  //             productObject = { 
  //               "user": users[i].innerHTML,              
  //               // "date": date,
  //               "text": reviews[i].innerHTML, 
  //             }
  //             productList.push(productObject)
  //           };    
  //           fetch(`http://127.0.0.1:8000/search/search/update/${searchId}/`, {
  //             method: "POST",
  //             body: JSON.stringify({"searchId": searchId, "data": productList}),
  //             headers: {
  //               'Content-Type': 'application/json',
  //               'Accept': 'application/json'
  //           },
  //           })
  //           .then(res => res.json())
  //           .then(json => console.log(json))
  //           .catch(err => console.log(err))
  //           console.log("doonnnee") 
             
  //         return productList  
  //         }, searchId)              
  //       }
  
  //     product.push(...body)            
  
  //       await chrome.close()
  //     } catch (error) {
  //       console.log(error)
  //     }
  //     return product
  // }


module.exports = scrapeTrustPilot;