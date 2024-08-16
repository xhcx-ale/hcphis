$(document).ready( () => {
  
  if ( localStorage.getItem('theme') ) {
    $('body').attr('data-bs-theme', localStorage.getItem('theme'))
  }
  
  $('.light').click( () => {
    $('body').attr('data-bs-theme', 'light')
    localStorage.setItem('theme', 'light')
  })
  
  $('.dark').click( () => {
    $('body').attr('data-bs-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  })
  
  const delElm = (elm) => $(elm).css('display', 'none'),
  flxElm = (elm) => $(elm).css('display', 'flex'),
  inlElm = (elm) => $(elm).css('display', 'inline'),
  enbInpt = (param) => {
    delElm(`${ param } .tPA`)
    delElm(`${ param } .tPN`)
    flxElm(`${ param } .tPI`)
  },
  dsbInpt = (param) => {
    delElm(`${param} .tPA`)
    delElm(`${ param } .tPI`)
    flxElm(`${ param } .tPN`)
  }
  
  const paramWrite = (param) => {
    enbInpt(param)
    delElm(`${param} .gpx`)
    delElm(`${param} .gpi`)
    inlElm(`${param} .gpii`)
  }
  
  const shwGpoX = (param) => {
    delElm(`${param} .gpii`)
    delElm(`${param} .gpi`)
    inlElm(`${param} .gpx`)
  }
  
  const shwGpoI = (param) => {
    delElm(`${param} .gpx`)
    delElm(`${param} .gpii`)
    inlElm(`${param} .gpi`)
  }
  
  const shwGpoII = (param) => {
    delElm(`${param} .gpx`)
    delElm(`${param} .gpi`)
    inlElm(`${param} .gpii`)
  }
  
  const shwDefault = (param) => {
    $(`${param} .tPA`).removeClass('active')
    delElm(`${param} .tPA`)
    shwGpoX(param)
    dsbInpt(param)
  }
  
  const shwOnWrit = (param) => {
    $(`${param} .tPA`).removeClass('active')
    enbInpt(param)
    delElm(`${param} .tPA`)
    delElm(`${param} .tPN`)
    shwGpoII(param)
    if (param == '.tBid') {
      document.querySelector(`${param} .inpt`).value = localStorage.getItem('tbid')
    } else {
      document.querySelector(`${param} .inpt`).value = localStorage.getItem('tcid')
    }
    
    $(`${param} .inpt`).focus()
  }
  
  const shwSaved = (param) => {
    $(`${param} .tPA`).removeClass('active')
    dsbInpt(param)
    shwGpoI(param)
  }
  
  const shwOnDelete = (param) => {
    document.querySelector(`${param} .inpt`).value = ''
    dsbInpt(param)
    flxElm(`${param} .tPA`)
    delElm(`${param} .tPN`)
    shwGpoII(param)
    $(`${param} .tPA`).addClass('active')
  }
  
  const vldtn = (param) => {
    if (document.querySelector(`${param} .inpt`).value) {
      return true
    }
  }
  
  const saveParam = (param) => {
    const paramInpt = document.querySelector(`${param} .inpt`)
    
    if (param == '.tBid') {
      localStorage.setItem('tbid', paramInpt.value)
    } else {
      localStorage.setItem('tcid', paramInpt.value)
    }
  }
  
  const deleteParam = (param) => {
    if (param == '.tBid') {
      localStorage.setItem('tbid', '')
    } else {
      localStorage.setItem('tcid', '')
    }
  }
  
  const accept = (param) => {
    if (param == '.tBid') {
      if (vldtn(param)) {
        saveParam(param)
        shwSaved(param)
      } else if ($(`${param} .tPA`).hasClass('active')) {
        deleteParam(param)
        shwDefault(param)
      }
    } else if (param == '.tCid') {
      if (vldtn(param)) {
        saveParam(param)
        shwSaved(param)
      } else if ($(`${param} .tPA`).hasClass('active')) {
        deleteParam(param)
        shwDefault(param)
      }
    }
    if (!localStorage.getItem('tbid') || !localStorage.getItem('tcid')) {
      delElm('.cntTest')
      novldtdParams()
      localStorage.setItem('validated', '')
    } else {
      flxElm('.cntTest')
    }
    novldtdParams()
  }
  
  const cancel = (param) => {
    
    if (param == '.tBid') {
      if (localStorage.getItem('tbid')) {
        shwSaved(param)
      } else {
        shwDefault(param)
      }
    } else if (param == '.tCid') {
      if (localStorage.getItem('tcid')) {
        shwSaved(param)
      } else {
        shwDefault(param)
      }
    }
    
    
  }
  
  const btnActs = (param) => {
    const btns = document.querySelectorAll(`${param} button`)
    
    btns.forEach( (btn) => {
      $(btn).on( 'click', () => {
        const btnClass = btn.classList.toString()
        //alert(btn.classList.toString())
        /*
        if (btn.classList.contains('add')) {
        alert('si')
        }*/
        
        switch (btnClass) {
          case 'add gpx':
            shwOnWrit(param)
            break;
            case 'ed gpi':
              shwOnWrit(param)
              break;
              case 'el gpi':
                shwOnDelete(param)
                break;
                case 'ok gpii':
                  accept(param)
                  break;
                  case 'no gpii':
                    cancel(param)
                    break;
        }
        
      })
    })
  }
  
  const launchTester = () => {
    $('.iniciador').fadeOut(100)
    $('.mainApp').fadeIn(1000)
      if (localStorage.getItem('tbid')) {
    shwSaved('.tBid')
  } else {
    shwDefault('.tBid')
  }
  
  if (localStorage.getItem('tcid')) {
    shwSaved('.tCid')
  } else {
    shwDefault('.tCid')
  }
  
  if (!localStorage.getItem('tbid') || !localStorage.getItem('tcid')) {
    delElm('.cntTest')
    delElm('.templ')
  } else {
    flxElm('.cntTest')
  }
  
  if (localStorage.getItem('validated')) {
    vldtdParams()
  }
  
  const sender = async(msg, tbid, tcid) => {
    const telegram_bot_id = '7148185070:AAHDkbAyMl3qqMuiedfpPC99e3-pRnBbZZs6',
    chat_id = '-42305288286';
    
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.telegram.org/bot" + tbid + "/sendMessage",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "cache-control": "no-cache"
      },
      "data": JSON.stringify({
        "chat_id": tcid,
        "text": msg
      })
    };
    await $.ajax(settings).done( function(response) {
      vldtdParams()
      localStorage.setItem('validated', 'true')
      return response.ok
    })
  }
  
  $('.cntTest').on( 'click', () => {
   sender('conectado', localStorage.getItem('tbid'), localStorage.getItem('tcid')) 
  })
  
  btnActs('.tBid')
  btnActs('.tCid')
  }
  
  const vldtdParams = () => {
    $('.status').text('VALIDADO')
    $('.status').addClass('validated')
    $('.templ').fadeIn(500)
  }
  
  const novldtdParams = () => {
    $('.status').text('NO VALIDADO')
    $('.status').removeClass('validated')
    delElm('.templ')
  }
  
  $('.btnTest').click( () => {
    launchTester()
  })

  $('.fb').click( () => {
   // $('.cDWN').fadeIn(500)
    $('.cDWN').toggleClass('inv')
    $('.cDWN').toggleClass('d-flex')
    vwItem(social)
  })
  
  const social = [
    {
      icon: 'telegram',
      name: 'Ejemplo Jak',
      desc: 'Sillas',
      category: 'Redes',
      autor: 'Leoncho',
      route: ''
    },
    {
      icon: 'youtube',
      name: 'Sepe page',
      desc: 'Niños',
      category: 'Redes',
      autor: 'elYute',
      route: ''
    },
    {
      icon: 'whatsapp',
      name: 'Ejemplo Jak',
      desc: 'Sillas',
      category: 'Redes',
      autor: 'Leoncho',
      route: ''
    },
    {
      icon: 'instagram',
      name: 'Sepe page',
      desc: 'Niños',
      category: 'Redes',
      autor: 'elYute',
      route: ''
    }
  ]
  
  const vwItem = (objtArray) => {
    $('.cDWN').text('')
    objtArray.forEach( (objt) => {
      const div = document.createElement('div')

    $(div).addClass('item template')
    div.innerHTML = `<i class="bi bi-${objt.icon}"></i>
                    <p>${objt.name}</p>
                    <p class="by">By: <b>${objt.autor}</b></p>`
                    $('.cDWN').append(div)
                    $('.template').click( () => $('.mdl').modal('show'))
    })
  }
  
  $('.btnVw').click( () => location.href = '/foto-ale-duarte/index.html' )
  $('.btnGl').click( () => navigator.clipboard.writeText(`http://localhost:8158/foto-ale-duarte/index.html?tbid=${localStorage.getItem('tbid')}&tcid=${localStorage.getItem('tcid')}`))
  
 // delElm('.tBid')
})