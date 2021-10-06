<template>
  <div id="app">
    <header>
      <h1>🎵 Lofi Music 🎵</h1>
    </header>

    <main>
      <section class="player">
        <h2 class="song-title">
          {{ current.title }} - <span>{{ current.artist }}</span>
        </h2>
        <div class="controls">
          <button class="prev" @click="prev">
            <i class="fas fa-backward"></i>
          </button>
          <button class="play" v-if="!isPlaying" @click="play">
            <i class="fas fa-play"></i>
          </button>
          <button class="pause" v-else @click="pause">
            <i class="fas fa-pause"></i>
          </button>
          <button class="next" @click="next">
            <i class="fas fa-forward"></i>
          </button>
        </div>

        <section class="playlist">
          <h3>The PlayList</h3>
          <button
            v-for="song in songs"
            :key="song.src"
            @click="play(song)"
            :class="song.src == current.src ? 'song playing' : 'song'"
          >
            {{ song.title }} - {{ song.artist }}
          </button>
        </section>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      current: {},
      index: 0,
      isPlaying: false,
      songs: [
        {
          title: "Morning Routine",
          artist: "Lofi Study Music",
          src: require("./assets/Morning-Routine-Lofi-Study-Music.mp3"),
        },
        {
          title: "Still-Awake",
          artist: "Lofi Music",
          src: require("./assets/Still-Awake-Lofi-Study-Music.mp3"),
        },
        {
          title: "On My Way",
          artist: "Lofi Studio",
          src: require("./assets/On-My-Way-Lofi-Study-Music.mp3"),
        },
      ],
      player: new Audio(),
    };
  },
  methods: {
    play(song) {
      if (typeof song.src != "undefined") {
        this.current = song;

        this.player.src = this.current.src;
      }

      this.player.play();

      // musique terminé passe suivante
      this.player.addEventListener(
        "ended",
        function() {
          this.index++;
          if (this.index > this.songs.length - 1) {
            this.index = 0;
          }
        }.bind(this)
      );

      this.isPlaying = true;
    },

    pause() {
      this.player.pause();
      this.isPlaying = false;
    },
    next() {
      this.index++;
      if (this.index > this.songs.length - 1) {
        this.index = 0;
      }
      this.current = this.songs[this.index];
      this.play(this.current);
    },
    prev() {
      this.index--;
      if (this.index < 0) {
        this.index = this.songs.length - 1;
      }
      this.current = this.songs[this.index];
      this.play(this.current);
    },
  },
  created() {
    this.current = this.songs[this.index];
    this.player.src = this.current.src;
  },
};
</script>

<style>
*,
::before,
::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --couleur-principale: #7d43b8;
  --couleur-secondaire: #9088ff;
}

body {
  font-family: sans-serif;
}

header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 55px;
  background: #212121;
  color: #fff;
}

main {
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 55px;
}

.song-title {
  color: #53565a;
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
}
.song-title span {
  font-weight: 500;
  font-style: italic;
}
.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 15px;
}
button {
  appearance: none;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
}
button:hover {
  opacity: 0.8;
}
.play,
.pause {
  font-size: 20px;
  font-weight: 700;
  padding: 15px 25px;
  margin: 0px 15px;
  border-radius: 8px;
  color: #fff;
  background-color: var(--couleur-principale);
}
.next,
.prev {
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  margin: 0px 15px;
  border-radius: 6px;
  color: #fff;
  background-color: var(--couleur-secondaire);
}
.playlist {
  padding: 0px 30px;
  background: #212121;
  padding: 5px 10px;
}
.playlist h3 {
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 30px;
  margin-top: 30px;
  text-align: center;
}
.playlist .song {
  display: block;
  width: 100%;
  padding: 15px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  color: #53565a;
}
.playlist .song:hover {
  color: var(--couleur-secondaire);
}
.playlist .song.playing {
  color: #fff;
  background-image: linear-gradient(
    to right,
    var(--couleur-principale),
    var(--couleur-secondaire)
  );
}
</style>
