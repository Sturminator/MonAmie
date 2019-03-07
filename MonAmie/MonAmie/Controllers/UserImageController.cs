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

namespace MonAmie.Controllers
{
    [ApiController]
    public class UserImageController : Controller
    {
        private IUserImageService userImageService;
        private IUserService userService;

        public UserImageController(IUserImageService userImageService, IUserService userService)
        {
            this.userImageService = userImageService;
            this.userService = userService;
        }

        [HttpGet]
        [Route("profile/api/UserImage/Index")]
        public IActionResult Index()
        {
            List<int> userImageIds = userImageService.GetAllUserImages().Select(ui => ui.UserImageId).ToList();

            return Ok(userImageIds);
        }

        
        [HttpGet]
        [Route("profile/api/UserImage/ViewImage/{id}")]
        public IActionResult ViewImage(int id)
        {
            var image = userImageService.GetByUserId(id);

            if (image != null)
            {

                var ms = new MemoryStream(image.Data);

                var imageItem = new FileStreamResult(ms, image.ContentType);

                return Ok(imageItem);
            }

            return null;
        }

        [HttpGet]
        [Route("api/UserImage/ViewImageDirect/{id}")]
        public IActionResult ViewImageDirect(int id)
        {
            var image = userImageService.GetByUserId(id);

            if (image != null)
            {

                var ms = new MemoryStream(image.Data);

                var imageItem = new FileStreamResult(ms, image.ContentType);

                return imageItem;
            }

            return null;
        }

        [HttpPost]
        [Route("profile/api/UserImage/UploadImage/{id}")]
        public IActionResult UploadImage(int id, [FromBody]IList<IFormFile> files)
        {
            IFormFile uploadedImage = files.FirstOrDefault();

            if(uploadedImage.ContentType.ToLower().StartsWith("image/"))
            {
                MemoryStream ms = new MemoryStream();
                uploadedImage.OpenReadStream().CopyTo(ms);

                Image image = Image.FromStream(ms);

                UserImage imageEntity = new UserImage
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

        [HttpPost]
        [Route("api/UserImage/UploadImage")]
        public IActionResult UploadImage(IList<IFormFile> files, int id)
        {
            IFormFile uploadedImage = files.FirstOrDefault();

            var user = userService.GetById(1);

            if (uploadedImage.ContentType.ToLower().StartsWith("image/"))
            {
                MemoryStream ms = new MemoryStream();
                uploadedImage.OpenReadStream().CopyTo(ms);

                Image image = Image.FromStream(ms);

                UserImage imageEntity = new UserImage
                {
                    FileName = uploadedImage.Name,
                    Data = ms.ToArray(),
                    Width = image.Width,
                    Height = image.Height,
                    ContentType = uploadedImage.ContentType,
                    UserId = 1
                };

                userImageService.AddUserImage(imageEntity);
            }

            return Ok();
        }
    }
}
