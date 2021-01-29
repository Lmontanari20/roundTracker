class CoursesController < ApplicationController

 

    def show 
        course = Course.find_by(id: params[:id])
        render json: course, include: :holes
    end

    def index
        courses = Course.all
        render json: courses
    end

    def analytics 
        course = Course.find(params[:id])
        rounds = course.rounds
        holes = []
        rounds.each { |round| 
            round.hole_rounds.each{|hole_round|
                holes << hole_round
            }
        }

        pp 'holes:'
        pp holes
        results = holes.each { |x| x.result }
        pp 'results;'
        pp results 
        data = {
            name: course.name,
            pars: results.count{|hole|hole.result === "Par"},
            birdies: results.count{|hole|hole.result === "Birdie"},
            eagles: results.count{|hole|hole.result === "Eagle"},
            bogey: results.count{|hole|hole.result === "Bogey"},
            db: results.count{|hole|hole.result === "Double Bogey"},
            holes: holes.count
        }
        render json: data
    end

end
