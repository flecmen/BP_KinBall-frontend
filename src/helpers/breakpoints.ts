
import { QVueGlobals } from 'quasar';

const breakPoints = {
  xs: {
    upper: 600,
    lower: 0,
  },
  sm: {
    upper: 1024,
    lower: 600,
  },
  md: {
    upper: 1440,
    lower: 1024,
  },
  lg: {
    upper: 1920,
    lower: 1440,
  },
  xl: {
    upper: 1920,
    lower: 1920,
  },
}


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

function isLessThan($q: QVueGlobals, breakpoint: number) {
  return $q.screen.width < breakpoint;
}
function isMoreThan($q: QVueGlobals, breakpoint: number) {
  return $q.screen.width > breakpoint;
}





export default {
  breakPoints,
  isXs,
  isSm,
  isMd,
  isLg,
  isXl,
  isLessThan,
  isMoreThan,
}
