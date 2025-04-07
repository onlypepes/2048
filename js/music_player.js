// Music Player
window.MusicPlayer = (function() {
  var audio = new Audio('assets/song.mp3');
  audio.loop = true;
  audio.volume = 0.3;
  
  var isMuted = true;
  var toggleButton = document.getElementById('music-toggle');
  
  // Load mute state from local storage if available
  if (localStorage.getItem('2048_music_muted') !== null) {
    isMuted = localStorage.getItem('2048_music_muted') === 'true';
  }
  
  function initialize() {
    // Set initial button state
    updateButtonState();
    
    // Add click event listener
    toggleButton.addEventListener('click', toggleMusic);
    
    // Start playing (will be muted initially if isMuted is true)
    if (!isMuted) {
      playMusic();
    }
    
    // Add user interaction listener to start music
    // (browsers require user interaction before playing audio)
    document.addEventListener('click', function userInteractionHandler() {
      if (!isMuted) {
        playMusic();
      }
      document.removeEventListener('click', userInteractionHandler);
    }, { once: true });
    
    // Also listen for keydown events for the same purpose
    document.addEventListener('keydown', function userInteractionHandler() {
      if (!isMuted) {
        playMusic();
      }
      document.removeEventListener('keydown', userInteractionHandler);
    }, { once: true });
  }
  
  function toggleMusic() {
    isMuted = !isMuted;
    localStorage.setItem('2048_music_muted', isMuted);
    
    if (isMuted) {
      pauseMusic();
    } else {
      playMusic();
    }
    
    updateButtonState();
  }
  
  function playMusic() {
    // Only play if actually unmuted
    if (!isMuted) {
      try {
        audio.play().catch(function(error) {
          // Ignore play() failures due to browser restrictions
          console.log("Audio playback was prevented by the browser:", error);
        });
      } catch (e) {
        // Ignore errors
      }
    }
  }
  
  function pauseMusic() {
    try {
      audio.pause();
    } catch (e) {
      // Ignore errors
    }
  }
  
  function updateButtonState() {
    if (isMuted) {
      toggleButton.classList.add('muted');
    } else {
      toggleButton.classList.remove('muted');
    }
  }
  
  // Initialize on document ready
  document.addEventListener("DOMContentLoaded", initialize);
  
  return {
    toggle: toggleMusic,
    play: playMusic,
    pause: pauseMusic
  };
})(); 