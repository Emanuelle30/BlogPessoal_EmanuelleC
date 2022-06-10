import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/service-postagem.service';
import { TemaService } from '../service/service-tema.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
 
  postagem: Postagem = new Postagem()
  listaPostagens: Postagem []

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  usuario: Usuario = new Usuario()
  idUsuario = environment.id
 

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private auth: AuthService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    
    window.scroll(0,0)

    if(environment.token == ''){
      alert('Sua seção expirou, faça o login novamente!')
      this.router.navigate(['/entrar'])
    }

    this.auth.refreshToken();
    this.getTema();
    this.getPostagens();
    }

    getTema(){
      this.temaService.getTema().subscribe((resp: Tema[]) => {
        this.listaTemas = resp
      })
    }
   
    findByIdTema(){
      this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
        this.tema = resp
      })

    }

    getPostagens(){
      this.postagemService.getPostagens().subscribe((resp: Postagem[]) => {
        this.listaPostagens = resp
      })

    }

    findByIdUsuario(){
      this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) =>{
        this.usuario = resp
      })
    }

    publicar(){
      this.tema.id = this.idTema
      this.postagem.tema = this.tema

      this.usuario.id = this.idUsuario
      this.postagem.usuario = this.usuario

      this.postagemService.postPostagens(this.postagem).subscribe((resp: Postagem)=>{
        this.postagem = resp
        alert('Postagem realizada com sucesso!')
        this.postagem = new Postagem()
        this.getPostagens()
      })
    }
  }



