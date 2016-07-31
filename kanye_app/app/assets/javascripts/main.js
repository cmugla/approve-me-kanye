$(document).ready(()=>{
  console.log("we here")

  function parseInput(e){
    e.preventDefault()

    let $saveBtn = $('input[name="save"]')
    $saveBtn.remove()

    let words = $('textarea').val().toLowerCase()
    /* Thanks to http://jsfiddle.net/zNHJW/3/ to parse through string and take out punctuation */
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

    const quotes = ["Keep your nose out the sky, keep your heart to god, and keep your face to the raising sun.",
      "Creative output, you know, is just pain. I'm going to be cliche for a minute and say that great art comes from pain.",
      "I liberate minds with my music. That's more important than liberating a few people from apartheid or whatever",
      "I really appreciate the moments that I was able to win rap album of the year or whatever.",
      "My message isn't perfectly defined. I have, as a human being, fallen to peer pressure.",
      "I will go down as the voice of this generation, of this decade, I will be the loudest voice.",
      "I feel like I'm too busy writing history to read it.",
      "Know your worth! People always act like they're doing more for you than you're doing for them."]

    let nopeRando   = Math.floor(Math.random()*nope.length)
    let kindaRando  = Math.floor(Math.random()*kindaApproves.length)
    let reallyRando = Math.floor(Math.random()*reallyApproves.length)
    let quotesRando = Math.floor(Math.random()*quotes.length)

    if(score === 0) {
      $h1.text("NOTHING! Zero. " + quotes[quotesRando])
      $img.attr('src', nope[nopeRando])
    } else if(score<30000){
      if(score<10000){
        $h1.text("Nope. " + quotes[quotesRando])
      } else if (score<20000){
        $h1.text("Nope. " + quotes[quotesRando])
      } else {
        $h1.text("Nah. " + quotes[quotesRando])
      }
      $img.attr('src', nope[nopeRando])
    } else if(score<92000){
      if(score<50000){
        $h1.text("Hmm.. " + quotes[quotesRando])
      } else if (score<70000){
        $h1.text("OKOK.. " + quotes[quotesRando])
      } else {
        $h1.text("ALRIGHT ALRIGHT I like it " + quotes[quotesRando])
      }
      $img.attr('src', kindaApproves[kindaRando])
    } else {
      $h1.text("wow, nice")
      $img.attr('src', reallyApproves[reallyRando])
    }

    let $button = $('<input type="submit" name="save" value="ARCHIVE THIS!">')
    let $form = $('form')
    $form.append($button)
    $button.click(saveToDB)
  }

  function saveToDB(e){
    e.preventDefault()

    let content = $('#words').val()
    let author  = $('input[name="author"]').val()

    if(!author){
      author    = "Anonymous"
    }

    let data    = {
      content: content,
      author: author
    }

    $.post('/lyrics', data)
      .done(data=>{
        console.log(data)
      })

    $('form').get(0).reset();
    $('#approval h1').empty();
    $('#approval img').attr('src', '');
    $('input[name="save"]').remove();

    getSavedLyrics();
  }

  function getSavedLyrics(){
    $.get('/lyrics')
      .done(data=>{
        data.forEach(appendSavedLyrics)
      })
  }

  function appendSavedLyrics(lyric){
    let $li         = $('<li>')
    let $blockquote = $('<blockquote>')
      let $q        = $('<q>')
      let $cite     = $('<cite>')
    let $button     = $('<button id="delete">')

    let author      = lyric.author
    let content     = lyric.content

    $li.attr("id", lyric.id)
    $q.text(content)
    $cite.text(author)

    $('#saved').prepend($li.append($blockquote.append($q,$cite), $button.text("Delete")))
    $('button#delete').click(deleteLyric);
  }

  function deleteLyric(e){
    let id = $(e.target).parent().attr("id")
    let url = '/lyrics/'+id
    $.ajax({
      url: url,
      method: 'delete'
    }).done(()=>{
      console.log("deleted")
      $(e.target).parent().remove()
    })
  }

  function showFeed(e){
    $('#feed').toggleClass('show');;
    $('aside').toggle()
    $('#feed-tab').toggleClass('stick-out');
  }

  let $button = $('input[name="approve"]')
  $button.click(parseInput)
  getSavedLyrics();

  let $aside = $('aside')
  $aside.hide();
  let $feedTab = $('#feed-tab')
  $feedTab.click(showFeed)

});
