document.addEventListener('DOMContentLoaded',function() {
  Forum.init();
});

let Forum = (function () {

  function init() {

    const newEntryForm = document.getElementById('new-entry');
    newEntryForm.addEventListener('submit', newEntryHandler);

    const entryName = document.querySelector('input');
    entryName.addEventListener('keyup', constrainText.bind(null, 45));

    const entryTopic = document.getElementById('new-entry-topic');
    entryTopic.addEventListener('keyup', constrainText.bind(null, 45));

    const entryText = document.getElementById('new-entry-text');
    entryText.addEventListener('keyup', constrainText.bind(null, 1000));

    const textArea = document.querySelector('textarea');
    textArea.addEventListener('keyup', counter);
    }


    function newEntryHandler(e) {
        const name = e.target.elements["name"];
        const nameValue = name.value;
        const text = e.target.elements["data"];
        const textValue = text.value;
        const topic = e.target.elements["topic_name"];
        const topicValue = topic.value;

        if(nameValue === '' || textValue === '' || topicValue === ''){
          e.preventDefault();
          alert('Fylla þarf í nafn, efni og texta');
          return;
      }
    }

    function counter(){
      const charCount = document.querySelector('.char-count');
      const textArea = document.querySelector('textarea');
      const letters = textArea.value;
      charCount.textContent = letters.length;
  }

  function constrainText(maxChars, e) {
    let input = e.target.value;
    if(input.length > maxChars){
      alert('Stafafjöldi er yfir hámarki. Hámarksfjöldi er 45 stafir.');
      input = input.substring(0, maxChars);
      e.target.value = input;
    }
  }
  return {
    init: init
  };
})();
