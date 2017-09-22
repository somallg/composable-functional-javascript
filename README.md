# composable-functional-javascript

Semigroup: datastructure that has .concat method
Monoid: Semigroup that has a neutral element for concat method

# 14. Functors
* Any type with map method and follow those 2 laws below:
  * fx.map(f).map(g) === fx.map(g(f(x)))
  * fx.map(id) === id(fx)

# 15. Lift into a Pointed Functor with of
* Use of to create a Functor instead of using complex contructor so we can map right away, do calculation

# 16. You've been using Monads
* Any type with of and chain (flatMap, bind, >>==) method: Box, Either, Task, List

const join = m =>
  m.chain(x => x);

* Law 1 join(m.map(join)) === join(join(m))
* Law 2 join(Box.of(m)) === join(m.map(Box.of))

# 17. Build curried functions
* Preloading data into a function
* How to build: instead of function that take multi parameters, create a function that return a function that return a function and so on. Data will come last in the chain so we can build up know value first

# 18. Applicative Functors for multiple arguments
* Box of a function we want to apply that funciton to another Box of a value
* F(x).map(f) === F(f).ap(F(x))


# 23. Maintaining structure whilst asyncing 
* We take our Promise.all() analogy further by using traversable on a Map(). Then we use two traversals in the same workflow.

# 24. Principled type conversions with Natural Transformations
* We learn what a natural transformation is and see the laws it must obey. We will see how a natural transformation must uphold the law of `nt(x).map(f) == nt(x.map(f))`.

# 25. Apply Natural Transformations in everyday work
* We see three varied examples of where natural transformations come in handy.

# 26. Isomorphisms and round trip data transformations
* We formally define isomorphisms, make a few, then use them to accomplish normal programming tasks

# 27. Build a data flow for a real world app
* We form a plan to find the common ground between two artists from the spotify api. Then we sketch out a data flow to ensure we have what we need, when we need it.

# 28. Find the intersection of sets with Semigroups
* We use semigroups to find the intersection of sets, then expand that to work on as many artists as we'd like. Finally, we use foldable to show a pair of intersection and sum to shed more light on the final result set.

