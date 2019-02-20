using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MonAmie.ViewModels;
using MonAmieData.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MonAmieData.Models;
using MonAmieData;

namespace MonAmie.Controllers
{
    [ApiController]
    public class UserImageController : ControllerBase
    {
        private IUserImageService userImageService;

        public UserImageController(IUserImageService userImageService)
        {
            this.userImageService = userImageService;
        }

        [HttpGet]
        [Route("api/UserImage/Index")]
        public IActionResult Index()
        {
            List<int> userImageIds = userImageService.GetAllUserImages().Select(ui => ui.UserImageId).ToList();

            return Ok(userImageIds);
        }

        [HttpPost]
        [Route("api/UserImage/UploadImage")]
        public IActionResult UploadImage(IList <IFormFile> files)
        {
            IFormFile uploadedImage = files.FirstOrDefault();
            if(uploadedImage == null || uploadedImage.ContentType.ToLower().StartsWith("image/"))
            {
                using (MonAmieContext dbContext = new MonAmieContext())///////////needs checking
                {
                    MemoryStream ms = new MemoryStream();
                    uploadedImage.OpenReadStream().CopyTo(ms);

                    System.Drawing.Image image = System.Drawing.Image.FromStream(ms);

                    UserImage imageEntity = new UserImage()
                    {
                        UserImageId = 1,
                        FileName = uploadedImage.Name,
                        Data = ms.ToArray(),
                        Width = image.Width,
                        Height = image.Height,
                        ContentType = uploadedImage.ContentType,
                        UserId = 1
                    };

                    dbContext.UserImage.Add(imageEntity);

                    dbContext.SaveChanges();
                }
            }

            return RedirectToAction("Index");
        }

        /*
        [HttpGet]
        public FileStreamResult ViewImage(int id)
        {

            using (MonAmieContext dbContext = new MonAmieContext())
            {
                UserImage image = dbContext.UserImage.FirstOrDefault(m => m.UserImageId == id);

                MemoryStream ms = new MemoryStream(image.Data);

                return new FileStreamResult(ms, image.ContentType);
            }

            return null;
        }
        */

    }
}
