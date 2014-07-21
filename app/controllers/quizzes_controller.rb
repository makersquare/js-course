class QuizzesController < AJAXController
  before_action :set_quiz, only: [:show, :edit, :update, :destroy]

  # GET /quizzes
  # GET /quizzes.json
  def index
    render json: Quiz.all
  end

  # GET /quizzes/1
  # GET /quizzes/1.json
  def show
    if @quiz
      render json: @quiz
    else
      render status: 404, json: { status: :could_not_find }
    end
  end

  # POST /quizzes
  # POST /quizzes.json
  def create
    @quiz = Quiz.new(quiz_params)

    if @quiz.save
      render json: { status: :created, entity: @quiz }
    else
      render json: @quiz.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /quizzes/1
  # PATCH/PUT /quizzes/1.json
  def update
    if @quiz.update(quiz_params)
      render json: { status: 200, entity: @quiz }
    else
      render json: @quiz.errors, status: :unprocessable_entity
    end
  end

  # DELETE /quizzes/1
  # DELETE /quizzes/1.json
  def destroy
    @quiz.destroy
    head :no_content, status: 200
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_quiz
      begin
        @quiz = Quiz.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        return
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def quiz_params
      params.require(:quiz).permit(:title)
    end
end
