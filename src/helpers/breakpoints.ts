
import { QVueGlobals } from 'quasar';


function isXs($q: QVueGlobals) {
  return $q.screen.width >= 0 && $q.screen.width < 600;
}
function isSm($q: QVueGlobals) {
  return $q.screen.width >= 600 && $q.screen.width < 1024;
}

function isMd($q: QVueGlobals) {
  return $q.screen.width >= 1024 && $q.screen.width < 1440;
}

function isLg($q: QVueGlobals) {
  return $q.screen.width >= 1440 && $q.screen.width < 1920;
}
function isXl($q: QVueGlobals) {
  return $q.screen.width >= 1920;
}

function isLessThanLg($q: QVueGlobals) {
  return $q.screen.width < 1440;
}

export default {
  isXs,
  isSm,
  isMd,
  isLg,
  isXl,
  isLessThanLg,
}
