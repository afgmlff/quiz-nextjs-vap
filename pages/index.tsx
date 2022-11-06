import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useState } from 'react'
import {useForm} from 'react-hook-form'
import { loadDefaultErrorComponents } from 'next/dist/server/load-components'

import { useNavigate } from "react-router-dom";
import { Router, useRouter } from 'next/router'
import { stringify } from 'querystring'

export default function Home() {

  const {register, handleSubmit, reset, formState:{errors}} = useForm()

  //const navigate = useNavigate();
  const router = useRouter()

  let nivel = ''

  let query = ''

  let temp = new Array<any>

  const gabarito: any[] = ['b', 'c', 'a', 'c', 'c', 'c', 'b', 'a', 'a', 'a', 'c', 'c', 'b', 'a', 'b', 'b', 'c', 'a', 'a', 'b', 'a', 'b', 'd', 'b', 'b', 'c', 'a', 'c', 'a', 'a']

  let score = 0
  
  function checkScore(){
    for(let i=0; i<30; i++){
      if(temp[i] == gabarito[i])
        score = score + 1
    }
    console.log("score: " + score)

    if(score == 30){
      nivel = 'C2'
    }
    else if (score > 24){
      nivel = 'C1'
    }
    else if (score > 18){
      nivel = 'B2'
    }
    else if (score > 12){
      nivel = 'B1'
    }
    else if (score > 6){
      nivel = 'A2'
    }
    else{
      nivel = 'A1'
    }
  }

  const onChange = (ev: any) => { //bind resposta especifica pra questao especifica. temp[0] = questao 1 + resposta da questao 1, etc...
    var id = (ev.target.id)
    var idNum: number = +id
    console.log(ev.target.value)
    console.log(idNum)

    temp[idNum] = ev.target.value
    
  }

  function verifSubmit(data: any){
    console.log(data)
    for (var i=0; i<30; i++){
      console.log(temp[i])
    }
    //console.log(gabarito[0])
    checkScore()
    //router.push('/resultado')
    router.push({
      pathname: '/resultado',
      query: { nivel: nivel.concat('-', score.toString()) }
    });
  //  navigate('/Resultado', {state: score})
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Teste de Nivelamento</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/cropped-4-2.png" />
      </Head>

      <main>
        <div className={styles.centralizeCont}>
        <h1>Teste de Nivelamento</h1>
        <form onSubmit={handleSubmit(verifSubmit)}>
          <div className={styles.qContainer}>
            <p className={styles.question}><span className={styles.mandatory}>* </span>Nome: </p>
            <div className={styles.answer}>
              {/* <input type="text" {...register('nome',{required: 'Digite seu nome'})}></input>   */} {/* required antigo, troquei por 'required' no input*/}
              <input type="text" required {...register('nome',{required: ''})}></input>
              {/*{errors.nome && <p className={styles.errorMsg}>Campo obrigatório</p>}*/} {/** error pro required antigo */}
            </div>
            
            <p className={styles.question}><span className={styles.mandatory}>* </span>E-mail: </p>
            <div className={styles.answer}>
            <input type="text" required {...register('email',{required: ''})}></input>
            </div>
            <br/>
            <br/>
            <p className={styles.question}>1. Eu _____ brasileiro.</p>
            <div className={styles.answer}>
              <input type="radio" id="0" defaultChecked={false} required name="answer1" value="a" onChange={onChange}></input>
              <label> a) estou</label>
              <br/>
              <input type="radio" id="0" defaultChecked={false} required name="answer1" value="b" onChange={onChange}></input>
              <label> b) sou</label>
              <br/>
              <input type="radio" id="0" defaultChecked={false} required name="answer1" value="c" onChange={onChange}></input>
              <label> c) tenho</label>
              <br/>
              <input type="radio" id="0" defaultChecked={false} required name="answer1" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>2. Ele _____ 24 anos.</p>
            <div className={styles.answer}>
              <input type="radio" id="1" defaultChecked={false} required name="answer2" value="a" onChange={onChange}></input>
              <label> a) está</label>
              <br/>
              <input type="radio" id="1" defaultChecked={false} required name="answer2" value="b" onChange={onChange}></input>
              <label> b) é</label>
              <br/>
              <input type="radio" id="1" defaultChecked={false} required name="answer2" value="c" onChange={onChange}></input>
              <label> c) tem</label>
              <br/>
              <input type="radio" id="1" defaultChecked={false} required name="answer2" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>3. Nós _____ com fome.</p>
            <div className={styles.answer}>
              <input type="radio" id="2" defaultChecked={false} required name="answer3" value="a" onChange={onChange}></input>
              <label> a) estamos</label>
              <br/>
              <input type="radio" id="2" defaultChecked={false} required name="answer3" value="b" onChange={onChange}></input>
              <label> b) somos</label>
              <br/>
              <input type="radio" id="2" defaultChecked={false} required name="answer3" value="c" onChange={onChange}></input>
              <label> c) temos</label>
              <br/>
              <input type="radio" id="2" defaultChecked={false} required name="answer3" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>4. ____ pai e ____ mãe de João moram no Rio de Janeiro.</p>
            <div className={styles.answer}>
              <input type="radio" id="3" defaultChecked={false} required name="answer4" value="a" onChange={onChange}></input>
              <label> a) A / a</label>
              <br/>
              <input type="radio" id="3" defaultChecked={false} required name="answer4" value="b" onChange={onChange}></input>
              <label> b) A / as</label>
              <br/>
              <input type="radio" id="3" defaultChecked={false} required name="answer4" value="c" onChange={onChange}></input>
              <label> c) O / a</label>
              <br/>
              <input type="radio" id="3" defaultChecked={false} required name="answer4" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>
            
            <br/>
            <br/>
            <p className={styles.question}>5. Eles ____ futebol.</p>
            <div className={styles.answer}>
              <input type="radio" id="4" defaultChecked={false} required name="answer5" value="a" onChange={onChange}></input>
              <label> a) gosta</label>
              <br/>
              <input type="radio" id="4" defaultChecked={false} required name="answer5" value="b" onChange={onChange}></input>
              <label> b) gostam</label>
              <br/>
              <input type="radio" id="4" defaultChecked={false} required name="answer5" value="c" onChange={onChange}></input>
              <label> c) gostam de</label>
              <br/>
              <input type="radio" id="4" defaultChecked={false} required name="answer5" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>6. _____ é o presidente do Brasil?</p>
            <div className={styles.answer}>
              <input type="radio" id="5" defaultChecked={false} required name="answer6" value="a" onChange={onChange}></input>
              <label> a) Que</label>
              <br/>
              <input type="radio" id="5" defaultChecked={false} required name="answer6" value="b" onChange={onChange}></input>
              <label> b) Qual</label>
              <br/>
              <input type="radio" id="5" defaultChecked={false} required name="answer6" value="c" onChange={onChange}></input>
              <label> c) Quem</label>
              <br/>
              <input type="radio" id="5" defaultChecked={false} required name="answer6" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>7. Onde está _____ livro?</p>
            <div className={styles.answer}>
              <input type="radio" id="6" defaultChecked={false} required name="answer7" value="a" onChange={onChange}></input>
              <label> a) mi</label>
              <br/>
              <input type="radio" id="6" defaultChecked={false} required name="answer7" value="b" onChange={onChange}></input>
              <label> b) meu</label>
              <br/>
              <input type="radio" id="6" defaultChecked={false} required name="answer7" value="c" onChange={onChange}></input>
              <label> c) minha</label>
              <br/>
              <input type="radio" id="6" defaultChecked={false} required name="answer7" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>8. Eu _____ para a escola todos os dias.</p>
            <div className={styles.answer}>
              <input type="radio" id="7" defaultChecked={false} required name="answer8" value="a" onChange={onChange}></input>
              <label> a) vou</label>
              <br/>
              <input type="radio" id="7" defaultChecked={false} required name="answer8" value="b" onChange={onChange}></input>
              <label> b) vai</label>
              <br/>
              <input type="radio" id="7" defaultChecked={false} required name="answer8" value="c" onChange={onChange}></input>
              <label> c) ir</label>
              <br/>
              <input type="radio" id="7" defaultChecked={false} required name="answer8" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>9. Eu estou _____ português.</p>
            <div className={styles.answer}>
              <input type="radio" id="8" defaultChecked={false} required name="answer9" value="a" onChange={onChange}></input>
              <label> a) estudando</label>
              <br/>
              <input type="radio" id="8" defaultChecked={false} required name="answer9" value="b" onChange={onChange}></input>
              <label> b) estudar</label>
              <br/>
              <input type="radio" id="8" defaultChecked={false} required name="answer9" value="c" onChange={onChange}></input>
              <label> c) estudei</label>
              <br/>
              <input type="radio" id="8" defaultChecked={false} required name="answer9" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>


            <br/>
            <br/>
            <p className={styles.question}>10. Ela _____ ontem.</p>
            <div className={styles.answer}>
              <input type="radio" id="9" defaultChecked={false} required name="answer10" value="a" onChange={onChange}></input>
              <label> a) viajou</label>
              <br/>
              <input type="radio" id="9" defaultChecked={false} required name="answer10" value="b" onChange={onChange}></input>
              <label> b) viajava</label>
              <br/>
              <input type="radio" id="9" defaultChecked={false} required name="answer10" value="c" onChange={onChange}></input>
              <label> c) viajado</label>
              <br/>
              <input type="radio" id="9" defaultChecked={false} required name="answer10" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>11. Eu _____ suco de caju todos os dias quando eu _____ criança.</p>
            <div className={styles.answer}>
              <input type="radio" id="10" defaultChecked={false} required name="answer11" value="a" onChange={onChange}></input>
              <label> a) bebia / fui</label>
              <br/>
              <input type="radio" id="10" defaultChecked={false} required name="answer11" value="b" onChange={onChange}></input>
              <label> b) bebi / fui</label>
              <br/>
              <input type="radio" id="10" defaultChecked={false} required name="answer11" value="c" onChange={onChange}></input>
              <label> c) bebia / era</label>
              <br/>
              <input type="radio" id="10" defaultChecked={false} required name="answer11" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>12. Como se escreve o número 123?</p>
            <div className={styles.answer}>
              <input type="radio" id="11" defaultChecked={false} required name="answer12" value="a" onChange={onChange}></input>
              <label> a) cem vinte e três</label>
              <br/>
              <input type="radio" id="11" defaultChecked={false} required name="answer12" value="b" onChange={onChange}></input>
              <label> b) cento vinte e três</label>
              <br/>
              <input type="radio" id="11" defaultChecked={false} required name="answer12" value="c" onChange={onChange}></input>
              <label> c) cento e vinte e três</label>
              <br/>
              <input type="radio" id="11" defaultChecked={false} required name="answer12" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>13. Eu _____ para o Brasil na próxima semana.</p>
            <div className={styles.answer}>
              <input type="radio" id="12" defaultChecked={false} required name="answer13" value="a" onChange={onChange}></input>
              <label> a) viajar</label>
              <br/>
              <input type="radio" id="12" defaultChecked={false} required name="answer13" value="b" onChange={onChange}></input>
              <label> b) vou viajar</label>
              <br/>
              <input type="radio" id="12" defaultChecked={false} required name="answer13" value="c" onChange={onChange}></input>
              <label> c) vai viajar</label>
              <br/>
              <input type="radio" id="12" defaultChecked={false} required name="answer13" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>14. Eles ______ amanhã às 14h.</p>
            <div className={styles.answer}>
              <input type="radio" id="13" defaultChecked={false} required name="answer14" value="a" onChange={onChange}></input>
              <label> a) chegarão</label>
              <br/>
              <input type="radio" id="13" defaultChecked={false} required name="answer14" value="b" onChange={onChange}></input>
              <label> b) chegaram</label>
              <br/>
              <input type="radio" id="13" defaultChecked={false} required name="answer14" value="c" onChange={onChange}></input>
              <label> c) chegar</label>
              <br/>
              <input type="radio" id="13" defaultChecked={false} required name="answer14" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>15. Morei _____ Brasil _____ 2 anos.</p>
            <div className={styles.answer}>
              <input type="radio" id="14" defaultChecked={false} required name="answer15" value="a" onChange={onChange}></input>
              <label> a) em / para</label>
              <br/>
              <input type="radio" id="14" defaultChecked={false} required name="answer15" value="b" onChange={onChange}></input>
              <label> b) no / por</label>
              <br/>
              <input type="radio" id="14" defaultChecked={false} required name="answer15" value="c" onChange={onChange}></input>
              <label> c) em / por</label>
              <br/>
              <input type="radio" id="14" defaultChecked={false} required name="answer15" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>16. Eu gosto de viajar _____ avião.</p>
            <div className={styles.answer}>
              <input type="radio" id="15" defaultChecked={false} required name="answer16" value="a" onChange={onChange}></input>
              <label> a) em</label>
              <br/>
              <input type="radio" id="15" defaultChecked={false} required name="answer16" value="b" onChange={onChange}></input>
              <label> b) de</label>
              <br/>
              <input type="radio" id="15" defaultChecked={false} required name="answer16" value="c" onChange={onChange}></input>
              <label> c) por</label>
              <br/>
              <input type="radio" id="15" defaultChecked={false} required name="answer16" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>17. O banco _____.</p>
            <div className={styles.answer}>
              <input type="radio" id="16" defaultChecked={false} required name="answer17" value="a" onChange={onChange}></input>
              <label> a) foi roubou</label>
              <br/>
              <input type="radio" id="16" defaultChecked={false} required name="answer17" value="b" onChange={onChange}></input>
              <label> b) foi roubava</label>
              <br/>
              <input type="radio" id="16" defaultChecked={false} required name="answer17" value="c" onChange={onChange}></input>
              <label> c) foi roubado</label>
              <br/>
              <input type="radio" id="16" defaultChecked={false} required name="answer17" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>18. Eu sou _____ que meu irmão.</p>
            <div className={styles.answer}>
              <input type="radio" id="17" defaultChecked={false} required name="answer18" value="a" onChange={onChange}></input>
              <label> a) maior</label>
              <br/>
              <input type="radio" id="17" defaultChecked={false} required name="answer18" value="b" onChange={onChange}></input>
              <label> b) mais grande</label>
              <br/>
              <input type="radio" id="17" defaultChecked={false} required name="answer18" value="c" onChange={onChange}></input>
              <label> c) mais maior</label>
              <br/>
              <input type="radio" id="17" defaultChecked={false} required name="answer18" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>19. _____ um mosquito dentro do quarto.</p>
            <div className={styles.answer}>
              <input type="radio" id="18" defaultChecked={false} required name="answer19" value="a" onChange={onChange}></input>
              <label> a) Tem</label>
              <br/>
              <input type="radio" id="18" defaultChecked={false} required name="answer19" value="b" onChange={onChange}></input>
              <label> b) É</label>
              <br/>
              <input type="radio" id="18" defaultChecked={false} required name="answer19" value="c" onChange={onChange}></input>
              <label> c) Está</label>
              <br/>
              <input type="radio" id="18" defaultChecked={false} required name="answer19" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>20. Ele me disse _____ que ele sabe.</p>
            <div className={styles.answer}>
              <input type="radio" id="19" defaultChecked={false} required name="answer20" value="a" onChange={onChange}></input>
              <label> a) todo</label>
              <br/>
              <input type="radio" id="19" defaultChecked={false} required name="answer20" value="b" onChange={onChange}></input>
              <label> b) tudo</label>
              <br/>
              <input type="radio" id="19" defaultChecked={false} required name="answer20" value="c" onChange={onChange}></input>
              <label> c) todos</label>
              <br/>
              <input type="radio" id="19" defaultChecked={false} required name="answer20" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>21. Ele comprou um sanduíche para _____.</p>
            <div className={styles.answer}>
              <input type="radio" id="20" defaultChecked={false} required name="answer21" value="a" onChange={onChange}></input>
              <label> a) mim</label>
              <br/>
              <input type="radio" id="20" defaultChecked={false} required name="answer21" value="b" onChange={onChange}></input>
              <label> b) me</label>
              <br/>
              <input type="radio" id="20" defaultChecked={false} required name="answer21" value="c" onChange={onChange}></input>
              <label> c) eu</label>
              <br/>
              <input type="radio" id="20" defaultChecked={false} required name="answer21" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>22. Eu _____ de uma água, por favor.</p>
            <div className={styles.answer}>
              <input type="radio" id="21" defaultChecked={false} required name="answer22" value="a" onChange={onChange}></input>
              <label> a) gostava</label>
              <br/>
              <input type="radio" id="21" defaultChecked={false} required name="answer22" value="b" onChange={onChange}></input>
              <label> b) gostaria</label>
              <br/>
              <input type="radio" id="21" defaultChecked={false} required name="answer22" value="c" onChange={onChange}></input>
              <label> c) gostei</label>
              <br/>
              <input type="radio" id="21" defaultChecked={false} required name="answer22" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>23. _____ você quer aprender português?</p>
            <div className={styles.answer}>
              <input type="radio" id="22" defaultChecked={false} required name="answer23" value="a" onChange={onChange}></input>
              <label> a) Por que</label>
              <br/>
              <input type="radio" id="22" defaultChecked={false} required name="answer23" value="b" onChange={onChange}></input>
              <label> b) Porque</label>
              <br/>
              <input type="radio" id="22" defaultChecked={false} required name="answer23" value="c" onChange={onChange}></input>
              <label> c) Porquê</label>
              <br/>
              <input type="radio" id="22" defaultChecked={false} required name="answer23" value="d" onChange={onChange}></input>
              <label> d) Por quê</label>
              <br/>
              <input type="radio" id="22" defaultChecked={false} required name="answer23" value="e" onChange={onChange}></input>
              <label> e) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>24. Ele sairia de casa quando ______ de chover.</p>
            <div className={styles.answer}>
              <input type="radio" id="23" defaultChecked={false} required name="answer24" value="a" onChange={onChange}></input>
              <label> a) parou</label>
              <br/>
              <input type="radio" id="23" defaultChecked={false} required name="answer24" value="b" onChange={onChange}></input>
              <label> b) parasse</label>
              <br/>
              <input type="radio" id="23" defaultChecked={false} required name="answer24" value="c" onChange={onChange}></input>
              <label> c) parava</label>
              <br/>
              <input type="radio" id="23" defaultChecked={false} required name="answer24" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>25. Espero que você _____.</p>
            <div className={styles.answer}>
              <input type="radio" id="24" defaultChecked={false} required name="answer25" value="a" onChange={onChange}></input>
              <label> a) entendesse</label>
              <br/>
              <input type="radio" id="24" defaultChecked={false} required name="answer25" value="b" onChange={onChange}></input>
              <label> b) entenda</label>
              <br/>
              <input type="radio" id="24" defaultChecked={false} required name="answer25" value="c" onChange={onChange}></input>
              <label> c) entender</label>
              <br/>
              <input type="radio" id="24" defaultChecked={false} required name="answer25" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>26. Se eu _____ uma festa, eu te convido.</p>
            <div className={styles.answer}>
              <input type="radio" id="25" defaultChecked={false} required name="answer26" value="a" onChange={onChange}></input>
              <label> a) fazer</label>
              <br/>
              <input type="radio" id="25" defaultChecked={false} required name="answer26" value="b" onChange={onChange}></input>
              <label> b) faço</label>
              <br/>
              <input type="radio" id="25" defaultChecked={false} required name="answer26" value="c" onChange={onChange}></input>
              <label> c) fizer</label>
              <br/>
              <input type="radio" id="25" defaultChecked={false} required name="answer26" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>27. Eu _____ muito ultimamente.</p>
            <div className={styles.answer}>
              <input type="radio" id="26" defaultChecked={false} required name="answer27" value="a" onChange={onChange}></input>
              <label> a) tenho lido</label>
              <br/>
              <input type="radio" id="26" defaultChecked={false} required name="answer27" value="b" onChange={onChange}></input>
              <label> b) tinha lido</label>
              <br/>
              <input type="radio" id="26" defaultChecked={false} required name="answer27" value="c" onChange={onChange}></input>
              <label> c) ter lido</label>
              <br/>
              <input type="radio" id="26" defaultChecked={false} required name="answer27" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>28. Eu já _____ quando ele chegou.</p>
            <div className={styles.answer}>
              <input type="radio" id="27" defaultChecked={false} required name="answer28" value="a" onChange={onChange}></input>
              <label> a) tenho comido</label>
              <br/>
              <input type="radio" id="27" defaultChecked={false} required name="answer28" value="b" onChange={onChange}></input>
              <label> b) comi</label>
              <br/>
              <input type="radio" id="27" defaultChecked={false} required name="answer28" value="c" onChange={onChange}></input>
              <label> c) tinha comido</label>
              <br/>
              <input type="radio" id="27" defaultChecked={false} required name="answer28" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>29. _____ alto ____ frio.</p>
            <div className={styles.answer}>
              <input type="radio" id="28" defaultChecked={false} required name="answer29" value="a" onChange={onChange}></input>
              <label> a) Quanto mais / mais</label>
              <br/>
              <input type="radio" id="28" defaultChecked={false} required name="answer29" value="b" onChange={onChange}></input>
              <label> b) O mais / mais</label>
              <br/>
              <input type="radio" id="28" defaultChecked={false} required name="answer29" value="c" onChange={onChange}></input>
              <label> c) O mais / o mais comido</label>
              <br/>
              <input type="radio" id="28" defaultChecked={false} required name="answer29" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

            <br/>
            <br/>
            <p className={styles.question}>30. Eu moro em São Paulo _____ 10 anos.</p>
            <div className={styles.answer}>
              <input type="radio" id="29" defaultChecked={false} required name="answer30" value="a" onChange={onChange}></input>
              <label> a) faz</label>
              <br/>
              <input type="radio" id="29" defaultChecked={false} required name="answer30" value="b" onChange={onChange}></input>
              <label> b) fazem</label>
              <br/>
              <input type="radio" id="29" defaultChecked={false} required name="answer30" value="c" onChange={onChange}></input>
              <label> c) desde</label>
              <br/>
              <input type="radio" id="29" defaultChecked={false} required name="answer30" value="d" onChange={onChange}></input>
              <label> d) Não sei</label>
              <br/>
            </div>

          </div>
          <div className={styles.submitBut}>
            <button>Enviar questionário</button>
          </div>
        </form>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/afgmlff"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/me.jpg" width={16} height={16} className={styles.roundedImg} alt={''} />
          </span>
        </a>
      </footer>
    </div>
  )
}
function getElementsbyName(arg0: string) {
  throw new Error('Function not implemented.')
}

