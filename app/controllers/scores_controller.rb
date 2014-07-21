class ScoresController < AJAXController
  before_action :set_score, only: [:show, :edit, :update, :destroy]
  before_action :set_quiz

  # GET /scores
  # GET /scores.json
  def index
    @scores = @quiz.scores.all
    render json: @scores
  end

  # GET /scores/1
  # GET /scores/1.json
  def show
    if @score
      render json: @score
    else
      render status: 404, json: { status: :could_not_find }
    end
  end

  # POST /scores
  # POST /scores.json
  def create
    @score = @quiz.scores.new(score_params)

    if @score.save
      render json: { status: :created, entity: @score }
    else
      render json: @score.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /scores/1
  # PATCH/PUT /scores/1.json
  def update
    if @score.update(score_params)
      render json: { status: 200, entity: @score }
    else
      render json: @score.errors, status: :unprocessable_entity
    end
  end

  # DELETE /scores/1
  # DELETE /scores/1.json
  def destroy
    @score.destroy
    head :no_content, status: 200
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_score
      begin
        @score = @quiz.scores.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        return
      end
    end

    def set_quiz
      @quiz = Quiz.find(params[:quiz_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def score_params
      params.require(:score).permit(:score, :user)
    end
end
