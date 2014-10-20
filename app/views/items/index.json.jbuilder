json.array!(@items) do |item|
  json.extract! item, :id, :name, :description, :price, :quantity
  json.url item_url(item, format: :json)
end
