const Movie = require('./models/Movie');

const resolvers = {
  Query: {
    getAllMovies: async () => {
      try {
        const movies = await Movie.find({});
        console.log("Movies found:", movies); // Debugging log
        return movies;
      } catch (error) {
        console.error("Error in getAllMovies:", error.message);
        return [];
      }
    },
    getMovieById: async (_, { id }) => {
      try {
        const movie = await Movie.findById(id);
        if (!movie) {
          throw new Error('Movie not found');
        }
        return movie;
      } catch (error) {
        console.error("Error in getMovieById:", error.message);
        return null;
      }
    }
  },

  Mutation: {
    addMovie: async (_, { name, director_name, production_house, release_date, rating }) => {
      try {
        const newMovie = new Movie({ name, director_name, production_house, release_date, rating });
        const savedMovie = await newMovie.save();
        console.log("Movie added:", savedMovie); // Debugging log
        return savedMovie;
      } catch (error) {
        console.error("Error in addMovie:", error.message);
        return null;
      }
    },
    updateMovie: async (_, { id, name, director_name, production_house, release_date, rating }) => {
      try {
        const updatedMovie = await Movie.findByIdAndUpdate(
          id,
          { name, director_name, production_house, release_date, rating },
          { new: true } // Return the updated movie
        );
        if (!updatedMovie) {
          throw new Error('Movie not found for update');
        }
        console.log("Movie updated:", updatedMovie); // Debugging log
        return updatedMovie;
      } catch (error) {
        console.error("Error in updateMovie:", error.message);
        return null;
      }
    },
    deleteMovie: async (_, { id }) => {
      try {
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) {
          throw new Error('Movie not found for deletion');
        }
        console.log("Movie deleted:", deletedMovie); // Debugging log
        return "Movie deleted successfully";
      } catch (error) {
        console.error("Error in deleteMovie:", error.message);
        return "Error deleting movie";
      }
    }
  }
};

module.exports = resolvers;
