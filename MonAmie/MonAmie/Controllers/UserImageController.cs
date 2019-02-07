using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MonAmie.ViewModels;
using MonAmieData.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

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
                MemoryStream ms = new MemoryStream();
                uploadedImage.OpenReadStream().CopyTo(ms);

                return Ok();
            }

            return RedirectToAction("IndeX");
        }
    }
}
