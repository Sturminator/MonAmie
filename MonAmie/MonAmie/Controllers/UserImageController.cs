using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MonAmie.ViewModels;
using MonAmieData.Interfaces;
using System.Drawing;
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
        private IUserService userService;

        public UserImageController(IUserImageService userImageService, IUserService userService)
        {
            this.userImageService = userImageService;
            this.userService = userService;
        }

        [HttpGet]
        [Route("api/UserImage/Index")]
        public IActionResult Index()
        {
            List<int> userImageIds = userImageService.GetAllUserImages().Select(ui => ui.UserImageId).ToList();

            return Ok(userImageIds);
        }

        
        [HttpGet]
        [Route("api/UserImage/ViewImage/{id}")]
        public FileStreamResult ViewImage(int id)
        {
            UserImage image = userImageService.GetById(id);

            MemoryStream ms = new MemoryStream(image.Data);

            FileStreamResult imageItem = new FileStreamResult(ms, image.ContentType);

            return imageItem;
        }

        [HttpPost]
        [Route("api/UserImage/UploadImage/{files}")]
        public IActionResult UploadImage(IList <IFormFile> files, int id)
        {
            IFormFile uploadedImage = files.FirstOrDefault();

            if(uploadedImage == null || uploadedImage.ContentType.ToLower().StartsWith("image/"))
            {
                MemoryStream ms = new MemoryStream();
                uploadedImage.OpenReadStream().CopyTo(ms);

                Image image = Image.FromStream(ms);

                UserImage imageEntity = new UserImage()
                {
                    UserImageId = id,
                    FileName = uploadedImage.Name,
                    Data = ms.ToArray(),
                    Width = image.Width,
                    Height = image.Height,
                    ContentType = uploadedImage.ContentType,
                    UserId = id
                };

                userImageService.AddUserImage(imageEntity);
            }

            return RedirectToAction("Index");
        }     
    }
}
