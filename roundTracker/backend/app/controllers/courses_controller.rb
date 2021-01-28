class CoursesController < ApplicationController

    def analytics
        
    end

    def show 
        course = Course.find_by(id: params[:id])
        render json: course, include: :holes
    end

    def index
        courses = Course.all
        render json: courses
    end

end
