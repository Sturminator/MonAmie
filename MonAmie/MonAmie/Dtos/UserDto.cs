using MonAmieData.Models;
using System.Collections.Generic;

namespace MonAmie.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Birthdate { get; set; }
        public string Gender { get; set; }
        public string State { get; set; }
        public string Bio { get; set; }
        public List<Category> Categories { get; set; }
    }
}
