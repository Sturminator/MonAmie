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
using System;

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
        public IActionResult UploadImage(int id, object files)
        {
            /*
            foreach (var file in files.Files)
            {
                UploadedFile(file, id);
            }


            IFormFile uploadedImage = (IFormFile)files;

            if(uploadedImage.ContentType.ToLower().StartsWith("image/"))
            {
                MemoryStream ms = new MemoryStream();
                uploadedImage.OpenReadStream().CopyTo(ms);

            //string temp = (string)files;

            //temp = temp.Replace("C:\\fakepath\\", "");

                Image image = Image.FromStream(ms);

                UserImage imageEntity = new UserImage
                {
                    UserImageId = id,
                    FileName = "",//uploadedImage.Name,
                    //Data = ms.ToArray(),
                    Width = image.Width,
                    Height = image.Height,
                    //ContentType = uploadedImage.ContentType,
                    UserId = id
                };

                userImageService.AddUserImage(imageEntity);
            }
            */

            return RedirectToAction("Index");
        }

        [HttpPut]
        [Route("profile/api/UserImage/Upload")]
        public dynamic UploadJustFile([FromBody]IFormCollection form)
        {
            

            return Ok();
        }

        private static void UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new Exception("File is empty!");
            byte[] fileArray;
            using (var stream = file.OpenReadStream())
            using (var memoryStream = new MemoryStream())
            {
                stream.CopyTo(memoryStream);
                fileArray = memoryStream.ToArray();
            }
            //TODO: You can do it what you want with you file, I just skip this step
        }

        private void UploadedFile(IFormFile file, int id)
        {
            IFormFile uploadedImage = file;

            if (uploadedImage.ContentType.ToLower().StartsWith("image/"))
            {
                MemoryStream ms = new MemoryStream();
                uploadedImage.OpenReadStream().CopyTo(ms);

                //string temp = (string)files;

                //temp = temp.Replace("C:\\fakepath\\", "");

                Image image = Image.FromStream(ms);

                UserImage imageEntity = new UserImage
                {
                    UserImageId = id,
                    FileName = "",//uploadedImage.Name,
                    //Data = ms.ToArray(),
                    Width = image.Width,
                    Height = image.Height,
                    //ContentType = uploadedImage.ContentType,
                    UserId = id
                };

                userImageService.AddUserImage(imageEntity);
            }
        }

        [HttpPost]
        [Route("api/UserImage/UploadImage")]
        public IActionResult UploadImage(IFormCollection files)
        {
            string temp = files["userId"];

            int.TryParse(temp, out int id);

            IFormFile uploadedImage;

            try
            {
                uploadedImage = files.Files[0];

                if (uploadedImage.ContentType.ToLower().StartsWith("image/") && uploadedImage != null)
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
                        UserId = id
                    };

                    UserImage item = userImageService.GetByUserId(id);

                    if (item != null)
                    {
                        //imageEntity.UserImageId = item.UserImageId;

                        userImageService.UpdateUserImage(imageEntity);
                    }

                    else
                    {
                        userImageService.AddUserImage(imageEntity);
                    }
                }
            }

            catch
            {

            }

            return Ok();
          
        }
    }
}
