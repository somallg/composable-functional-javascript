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
