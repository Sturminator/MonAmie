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

        /// <summary>
        /// Not used
        /// React - Redux image display
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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

        /// <summary>
        /// http get vs React - Redux get
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Not used in current version
        /// still needs some work
        /// was unable to properly pass a file object via React - Redux
        /// </summary>
        /// <param name="id"></param>
        /// <param name="files"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Not used or finalized
        /// was meant for a html form to be passed via React - Redux
        /// </summary>
        /// <param name="form"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("profile/api/UserImage/Upload")]
        public dynamic UploadJustFile([FromBody]IFormCollection form)
        {
           
            return Ok();
        }

        /// <summary>
        /// http image saving
        /// html form is sent and used to get user id and image file
        /// image is saved to DB
        /// </summary>
        /// <param name="files"></param>
        /// <returns></returns>
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
