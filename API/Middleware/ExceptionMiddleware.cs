using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private RequestDelegate _next;
        private ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger,

        IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;

        }
        public async Task InvokeAsync(HttpContext contest)
        {
            try
            {
                // if there is no exception, then continue
                await _next(contest);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                contest.Response.ContentType = "application/json";
                contest.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var responce = _env.IsDevelopment()
                             ? new ApiException((int)HttpStatusCode.InternalServerError, ex.Message, ex.StackTrace.ToString())
                             : new ApiException((int)HttpStatusCode.InternalServerError);

                var optins = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(responce, optins);

                await contest.Response.WriteAsync(json);
            }
        }
    }
}