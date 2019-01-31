using MonAmieData.ViewModels;

namespace MonAmieData.Interfaces
{
    public interface IAuthService
    {
        AuthData GetAuthData(int id);
    }
}
