using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using MonAmie.ViewModels;
using MonAmieData.Interfaces;
using System.Drawing;
using System.IO;
using MonAmieData.Models;

namespace MonAmie.Controllers
{
    public class GroupImageController : Controller
    {
        private IGroupImageService groupImageService;
        private IGroupService groupService;

        public GroupImageController(IGroupImageService groupImageService, IGroupService groupService)
        {
            this.groupImageService = groupImageService;
            this.groupService = groupService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/GroupImage/ViewImageDirect/{id}")]
        public IActionResult ViewImageDirect(int id)
        {
            var image = groupImageService.GetByGroupId(id);

            if (image != null)
            {

                var ms = new MemoryStream(image.Data);

                var imageItem = new FileStreamResult(ms, image.ContentType);

                return imageItem;
            }

            return null;
        }

        [HttpPost]
        [Route("api/GroupImage/UploadImage")]
        public IActionResult UploadImage(IFormCollection files)
        {
            string temp = files["groupId"];

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

                    GroupImage imageEntity = new GroupImage
                    {
                        FileName = uploadedImage.Name,
                        Data = ms.ToArray(),
                        Width = image.Width,
                        Height = image.Height,
                        ContentType = uploadedImage.ContentType,
                        GroupId = id
                    };

                    GroupImage item = groupImageService.GetByGroupId(id);

                    if (item != null)
                    {
                        //imageEntity.UserImageId = item.UserImageId;

                        groupImageService.UpdateGroupImage(imageEntity);
                    }

                    else
                    {
                        groupImageService.AddGroupImage(imageEntity);
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
