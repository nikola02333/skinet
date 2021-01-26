using System;

namespace API.Errors
{
    public class ApiReponce
    {
        public ApiReponce(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(StatusCode);
        }

        public int StatusCode { get; set; }

        public string Message { get; set; }
        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "A bad request, you have made",
                401 => "Authrized, you are not",
                404 => "Resource found, it was not",
                500 => "Errors are the path to the dark side",
                _ => null
            };
        }
    }
}