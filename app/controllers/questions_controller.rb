class QuestionsController < AJAXController
  before_action :set_question, only: [:show, :edit, :update, :destroy]
  before_action :set_quiz

  # GET /questions
  # GET /questions.json
  def index
    @questions = @quiz.questions.all
    render json: @questions
  end

  def check_answer
    response = {}
    @question = @quiz.questions.find(params[:question_id])
    if params[:answer] == @question.answer
      @question.correct_answers = @question.correct_answers.to_i + 1
      response['correct'] = true
    else
      response['correct'] = false
    end
    @question.times_answered = @question.times_answered.to_i + 1
    @question.save
    render json: response
  end

  # GET /questions/1
  # GET /questions/1.json
  def show
    if @question
      render json: @question
    else
      render status: 404, json: { status: :could_not_find }
    end
  end

  # POST /questions
  # POST /questions.json
  def create
    @question = @quiz.questions.new(question_params)

    if @question.save
      render json: { status: :created, entity: @question }
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /questions/1
  # PATCH/PUT /questions/1.json
  def update
    if @question.update(question_params)
      render json: { status: 200, entity: @question }
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  # DELETE /questions/1
  # DELETE /questions/1.json
  def destroy
    @question.destroy
    head :no_content, status: 200
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_question
      begin
        @question = @quiz.questions.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        return
      end
    end

    def set_quiz
      @quiz = Quiz.find(params[:quiz_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def question_params
      params.require(:question).permit(:question, :answer, :times_answered, :correct_answers, :quiz_id, :choices, :question_type)
    end

end
