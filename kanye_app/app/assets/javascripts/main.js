$(document).ready(()=>{
  console.log("we here")

  let $form = $('form')

  $form.submit(parseInput)

  function parseInput(e){
    e.preventDefault()

    let words = $('textarea').val().toLowerCase()
    /* Thanks to http://jsfiddle.net/zNHJW/3/ for parse through string and take out punctuation */
    let arrWords = words.replace(/[^\w\s]|_/g, function ($1) { return ' ' + $1 + ' ';}).replace(/[ ]+/g, ' ').split(' ');

    checkWithKanye(arrWords)
  }

  function checkWithKanye(arrWords){
    let score = 0;

    $.get('/words')
      .done(data=>{
        // var arr = Object.keys( data ).map(function ( key ) { return data[key]; });
        // console.log(arr)
        // var max = Math.max.apply( null, arr );
        // console.log("max", max)
        arrWords.forEach(word=>{
          if(data[word] && word != 'the') {
            score += data[word]
          }
        })
        appendScore(score)
      })
  }

  function appendScore(score){
    let rating  = ""+score;

    let $div    = $('#approval')
    let $h1     = $('#approval h1')
    let $img    = $('#approval img')

    const reallyApproves = ['http://i.giphy.com/e4zET7MOiX9ug.gif',
      'http://i.giphy.com/u7hjTwuewz3Gw.gif',
      'http://i.giphy.com/xTcnSNxfOFmfCCUTPG.gif',
      'http://i.giphy.com/5fMlYckytHM4g.gif',
      'http://i.giphy.com/26FxIJDQU6KcJcMEw.gif']
    const kindaApproves= ['http://i.giphy.com/3oEdvas1xzyLAuPGjS.gif',
      'http://i.giphy.com/xT8qBd1anoT13q5dF6.gif',
      'http://i.giphy.com/3oEjHIxD6j01Q8ZWbm.gif']
    const nope= ['http://i.giphy.com/Rt0vHXcmEbnMs.gif',
      'http://i.giphy.com/l41Ym7ql1UKk58KC4.gif',
      'http://i.giphy.com/3o7qDNPLv6X3wkVWus.gif',
      'http://i.giphy.com/PaPvxVB5dD6py.gif',
      'http://i.giphy.com/xTeVhuOj0btgm0wwIo.gif']

    if(score === 0) {
      $h1.text("NOTHING! Zero. Creative output, you know, is just pain. I'm going to be cliche for a minute and say that great art comes from pain.")
      let rando=Math.floor(Math.random()*nope.length)
      $img.attr('src', nope[rando])
    } else if(score<30000){
      if(score<10000){
        $h1.text("Nope. I liberate minds with my music. That's more important than liberating a few people from apartheid or whatever")
      } else if (score<20000){
        $h1.text("Nope. I really appreciate the moments that I was able to win rap album of the year or whatever.")
      } else {
        $h1.text("Nah. My message isn't perfectly defined. I have, as a human being, fallen to peer pressure.")
      }
      let rando=Math.floor(Math.random()*nope.length)
      $img.attr('src', nope[rando])
    } else if(score<92000){
      if(score<50000){
        $h1.text("I will go down as the voice of this generation, of this decade, I will be the loudest voice.")
      } else if (score<70000){
        $h1.text("I feel like I'm too busy writing history to read it.")
      } else {
        $h1.text("Know your worth! People always act like they're doing more for you than you're doing for them.")
      }
      let rando=Math.floor(Math.random()*kindaApproves.length)
      $img.attr('src', kindaApproves[rando])
    } else {
      $h1.text("wow, nice")
      let rando=Math.floor(Math.random()*reallyApproves.length)
      $img.attr('src', reallyApproves[rando])
    }

    const $button = $('<button>').text("ARCHIVE ME!")

    $div.append($button)
    $button.click(saveToDB)
  }

  function saveToDB(e){
    console.log("saved")

    let text = $('#words').val()
    console.log(text)
  }

});
