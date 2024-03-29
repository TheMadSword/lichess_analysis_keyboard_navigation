/**
* Author : TheMadSword @ GitHub
* Chrome extension intended for allowing keyboard shortcuts for
* inaccurracies, mistakes and blunders, instead of requiring mouse use.
*/

(function(){

const BLUNDER_KEY = "KeyB";
const MISTAKE_KEY = "KeyM";
const INACCURACY_KEY = "KeyI";
const NEXT_KEY = "Enter";
const ANALYSIS_LEARN_KEY = "KeyR";

if (!window.location.toString().includes("lichess.org/")) {
  console.log("Not Lichess ?");
  return;
}

function getCorrectUserLinkId(isAlternate) {
  let possibilities = document.querySelectorAll(".advice-summary__side a.user-link");
  let user = null;

  let classes = document.querySelector(".main-board .manipulable").classList;
  if (classes.contains("orientation-white")) {
    user = possibilities[Number(isAlternate)];
  } else if (classes.contains("orientation-black")) {
    user = possibilities[Number(!isAlternate)];
  }

  return user;
}

function click_badmoveinfo(badmoveclass, isAlternate) {
  let userLinkId = getCorrectUserLinkId(isAlternate);
  if (userLinkId !== null) {
    let selector = ".advice-summary__error." + badmoveclass;
    userLinkId.parentElement.parentElement
    .querySelector(selector)?.click();
  }
}

function click_next() {
  document.querySelector(".analyse__tools .training-box a.continue")?.click();
}

function click_analysis_learn() {
  document.querySelector(".analyse__underboard__panels .computer-analysis button, .analyse__round-training .advice-summary a.button")?.click();
}

function is_analysis() {
  let analysis_box = document.querySelector("#main-wrap .analyse__underboard");
  return analysis_box !== null && analysis_box.textContent !== '';
}

function is_chat_active() {
  return Array.from(document.querySelectorAll("input.mchat__say")).includes(document.activeElement);
}

function is_search_active() {
  return document.querySelector("#clinput input") === document.activeElement;
}

document.addEventListener('keyup', function(e) {
  if (e.ctrlKey || e.metaKey) {
    return;
  }

  if (!is_analysis() || is_chat_active() || is_search_active()) {
    return;
  }

  if (e.code === BLUNDER_KEY) {
    click_badmoveinfo("blunder", e.shiftKey || e.altKey);
  } else if (e.code === MISTAKE_KEY) {
    click_badmoveinfo("mistake", e.shiftKey || e.altKey);
  } else if (e.code === INACCURACY_KEY) {
    click_badmoveinfo("inaccuracy", e.shiftKey || e.altKey);
  } else if (e.code === NEXT_KEY) {
    click_next();
  } else if (e.code === ANALYSIS_LEARN_KEY) {
    click_analysis_learn();
  }
});

})()
