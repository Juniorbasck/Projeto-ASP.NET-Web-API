using API.Models;
using API.Repositorios.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.VisualBasic;
using System;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private ILogin _login;

        public LoginController(ILogin login) 
        {
            _login = login;
        }

        [HttpPost]
        public async Task<IActionResult> Logar(string userName, string userEmail)
        {
            try
            {
                var usuario = await _login.VerifyUser(userName, userEmail);

                if (usuario)
                {
                    return Ok(new { mensagem = "Login bem-sucedido" });
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Credenciais inválidas");
                    return BadRequest(ModelState);
                }
            }   
            catch (Exception e)
            {
                return StatusCode(500, "Ocorreu um erro durante o login.");
            }
        }
    }
}
