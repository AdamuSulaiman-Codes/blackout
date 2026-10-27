/* BLACKOUT web audio unlock: resume Godot's AudioContext on the first real input. */
(function () {
  var Native = window.AudioContext || window.webkitAudioContext;
  if (!Native) return;

  var contexts = [];
  var unlocked = false;

  function remember(ctx) {
    contexts.push(ctx);
    window.__blackoutAudioContexts = contexts;
    if (unlocked && ctx.state !== "running") {
      try { ctx.resume(); } catch (e) {}
    }
    return ctx;
  }

  try {
    var Wrapped = new Proxy(Native, {
      construct: function (target, args, newTarget) {
        return remember(Reflect.construct(target, args, newTarget));
      }
    });
    window.AudioContext = Wrapped;
    window.webkitAudioContext = Wrapped;
  } catch (e) {}

  function unlock() {
    unlocked = true;
    for (var i = 0; i < contexts.length; i++) {
      var ctx = contexts[i];
      if (ctx.state === "suspended" || ctx.state === "interrupted") {
        try { ctx.resume(); } catch (e) {}
      }
    }
    window.dispatchEvent(new CustomEvent("blackout-audio-unlocked"));
  }

  window.blackoutAudioUnlock = unlock;
  window.blackoutAudioState = function () {
    return contexts.map(function (ctx) { return ctx.state; });
  };

  ["pointerdown", "mousedown", "touchstart", "keydown"].forEach(function (name) {
    window.addEventListener(name, unlock, { capture: true, passive: true });
  });
  window.addEventListener("load", function () { setTimeout(unlock, 0); });
})();
