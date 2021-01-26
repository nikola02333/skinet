namespace API.Errors
{
    public class ApiException : ApiReponce
    {
        public ApiException(int statusCode, string message = null, string details = null) : base(statusCode, message = null)
        {
            Details = details;
        }
        public string Details { get; set; }

    }
}