class QuestionsController < AJAXController
  before_action :set_question, only: [:show, :edit, :update, :destroy]

  # GET /questions
  # GET /questions.json
  def index
    @questions = Question.all
    render json: @questions
  end

  def check_answer
    response = {}
    @question = Question.find(params[:question_id])
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

  # GET /questions/new
  def new
    @question = Question.new
    render json: @question
  end

  # POST /questions
  # POST /questions.json
  def create
    @question = Question.new(question_params)

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
        @question = Question.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        return
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def question_params
      params.require(:question).permit(:question, :answer, :times_answered, :correct_answers, :quiz_id, :choices)
    end
end
