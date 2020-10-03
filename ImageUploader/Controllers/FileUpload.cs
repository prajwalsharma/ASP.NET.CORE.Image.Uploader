using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileSystemGlobbing.Abstractions;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading;

namespace ImageUploader.Controllers
{
    public class FileUpload : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult UploadFile(IFormFile file)
        {
            // Wait 5 seconds to see CSS loader in action
            Thread.Sleep(5000);

            // Get uploaded files's extension
            string fileExtension = Path.GetExtension(file.FileName).ToLower();

            // Check for valid extensions
            if(fileExtension == ".png" || fileExtension == ".jpg" || fileExtension == ".jpeg")
            {
                // Generate unique file name
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

                // Path to store file
                string SavePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Uploads", fileName);

                // Copy file to server directory
                using (var stream = new FileStream(SavePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                string imageURL = HttpContext.Request.Host + "/Uploads/" + fileName;
                string imageSource = "/Uploads/" + fileName;

                string[] data = { imageURL, imageSource, "true" };

                return Json(data);
            }
                     
            return Json(null);
        }
    }
}
