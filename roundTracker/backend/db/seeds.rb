
Course.destroy_all
Hole.destroy_all
User.destroy_all
Round.destroy_all
HoleRound.destroy_all

Course.create(name: "Pebble Beach", location: "Pebble Beach, CA", par: 72)
Course.create(name: "Augusta National", location: "Augusta, GA", par: 72)
Course.create(name: "Wint Point Golf & Country Club", location: "Bainbridge Island, WA", par: 72)
Course.create(name: "Westchester", location: "Los Angeles, CA", par: 64)

18.times do 
 Hole.create(par: rand(3..5), distance: rand(200..450), course_id: 1)
end

User.create(username: "charlie")

Round.create(user_id: 1, name: '1/26/21 pebble', course_id: 1, length: 18)
Round.create(user_id: 1, name: '12/26/20 pebble', course_id: 1, length: 18)


18.times do |x|
   HoleRound.create(score: rand(3..9), hole_id: x + 1, round_id: 1, user_id: 1, course_id: 1)
end


18.times do |x|
   HoleRound.create(score: rand(3..9), hole_id: x + 1 , round_id: 2, user_id: 1, course_id: 1)
end
