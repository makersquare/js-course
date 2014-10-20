json.array!(@orders) do |order|
  json.extract! order, :id, :person, :cost
  json.url order_url(order, format: :json)
end
