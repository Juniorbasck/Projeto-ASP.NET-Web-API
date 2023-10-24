using API.Models;
using API.Repositorios.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.VisualBasic;
using System;
using System.Runtime.InteropServices;

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
        public async Task<ActionResult<dynamic>> Logar([FromBody] UsuarioModel user)
        {
            try
            {
               
                var nome = user.Name; 
                var email = user.Email; 
                
                var usuario = await _login.VerifyUser(nome, email);

                var SearchUserId = await _login.searchUserId(nome);

                var useId = SearchUserId;

                if (usuario)
                {
                    var tokenService = new TokenService();

                    var token = tokenService.GenerateToken(user);

                    var response = new
                    {   
                        UserId = useId,
                        nome = user.Name,
                        UserEmail = user.Email,
                        chave = token,
                        mensagem = "Login bem-sucedido"
                    };
                    return Ok(response);
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
